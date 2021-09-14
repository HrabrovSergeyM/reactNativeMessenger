import { Feather, Ionicons } from "@expo/vector-icons";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  useNavigation,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import {
  ColorSchemeName,
  Pressable,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import HomeScreen from "../screens/HomeScreen";
import ChatRoomScreen from "../screens/ChatRoomScreen";
import { RootStackParamList } from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import UsersScreen from "../screens/UsersScreen";
import { ChatRoomHeader } from "./ChatRoomHeader";
import GroupInfoScreen from "../screens/GroupInfoScreen";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerTitle: HomeHeader }}
      />
      <Stack.Screen
        name="ChatRoom"
        component={ChatRoomScreen}
        options={({ route }) => ({
          headerTitle: () => <ChatRoomHeader id={route.params?.id} />,
          headerBackTitleVisible: false,
        })}
      />
      <Stack.Screen name="GroupInfoScreen" component={GroupInfoScreen} />
      <Stack.Screen
        name="UsersScreen"
        component={UsersScreen}
        options={{ title: "Users" }}
      />
      {/* <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      /> */}
    </Stack.Navigator>
  );
}

const HomeHeader = () => {
  const { width } = useWindowDimensions();
  const navigation = useNavigation();

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        width,
        padding: 10,
        alignItems: "center",
      }}
    >
      <Text
        style={{
          flex: 1,
          textAlign: "center",
          marginLeft: 50,
          fontWeight: "bold",
        }}
      >
        Home
      </Text>
      <View style={{ flexDirection: "row" }}>
        <Ionicons
          name="camera-outline"
          size={24}
          color="black"
          style={{ marginHorizontal: 10 }}
        />
        <Pressable onPress={() => navigation.navigate("UsersScreen")}>
          <Feather
            name="edit-2"
            size={24}
            color="black"
            style={{ marginHorizontal: 10 }}
          />
        </Pressable>
      </View>
    </View>
  );
};
