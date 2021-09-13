import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Amplify, { Auth, DataStore, Hub } from "aws-amplify";
import { withAuthenticator } from "aws-amplify-react-native";
import config from "./src/aws-exports";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { Message, User } from "./src/models";
import moment from "moment";

Amplify.configure(config);

function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const listener = Hub.listen("datastore", async (hubData) => {
      const { event, data } = hubData.payload;
      if (
        event === "outboxMutationProcessed" &&
        data.model === Message &&
        !["DELIVERED", "READ"].includes(data.element.status)
      ) {
        DataStore.save(
          Message.copyOf(data.element, (updated) => {
            updated.status = "DELIVERED";
          })
        );
      }
    });

    return () => listener();
  }, []);

  useEffect(() => {
    if (!user) {
      return;
    }
    const subscription = DataStore.observe(User, user.id).subscribe((msg) => {
      if (msg.model === User && msg.opType === "UPDATE") {
        setUser(msg.element);
      }
    });

    return () => subscription.unsubscribe();
  }, [user?.id]);

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      await updateLastOnline();
    }, 1 * 60 * 1000);
    return () => clearInterval(interval);
  }, [user]);

  const fetchUser = async () => {
    const userData = await Auth.currentAuthenticatedUser();
    const user = await DataStore.query(User, userData.attributes.sub);
    if (user) {
      setUser(user);
    }
  };

  const updateLastOnline = async () => {
    if (!user) {
      return;
    }
    await DataStore.save(
      User.copyOf(user, (updated) => {
        updated.lastOnlineAt = +new Date();
      })
    );
  };

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}

export default withAuthenticator(App);
