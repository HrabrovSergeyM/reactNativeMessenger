import React, { useEffect, useState } from "react";
import { View, Image, Text, useWindowDimensions } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { Auth, DataStore } from "aws-amplify";
import { ChatRoomUser, User } from "../src/models";
import moment from "moment";

export const ChatRoomHeader = ({ id, children }) => {
  const { width } = useWindowDimensions();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!id) {
      return;
    }

    const fetchUsers = async () => {
      const fetchedUsers = (await DataStore.query(ChatRoomUser))
        .filter((chatRoomUser) => chatRoomUser.chatroom.id === id)
        .map((chatRoomUser) => chatRoomUser.user);

      // setUsers(fetchedUsers);

      const authUser = await Auth.currentAuthenticatedUser();
      setUser(
        fetchedUsers.find((user) => user.id !== authUser.attributes.sub) || null
      );
    };
    fetchUsers();
  }, []);

  const getLastOnlineText = () => {
    if (!user?.lastOnlineAt) {
      return null;
    }

    const lastOnlineDiffMS = moment().diff(moment(user.lastOnlineAt));
    if (lastOnlineDiffMS < 5 * 60 * 1000) {
      return "online";
    } else {
      return `Last seen online ${moment(user.lastOnlineAt).fromNow()}`;
    }
  };

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        width: width - 50,
        marginLeft: "auto",
        padding: 10,
        alignItems: "center",
        marginRight: 70,
      }}
    >
      <Image
        source={{
          uri: user?.imageUri,
        }}
        style={{ width: 30, height: 30, borderRadius: 30 }}
      />
      <View style={{ flex: 1, marginLeft: 10 }}>
        <Text
          style={{
            fontWeight: "bold",
          }}
        >
          {user?.name}
        </Text>
        <Text>{getLastOnlineText()}</Text>
      </View>

      <View style={{ flexDirection: "row" }}>
        <Ionicons
          name="camera-outline"
          size={24}
          color="black"
          style={{ marginHorizontal: 10 }}
        />
        <Feather
          name="edit-2"
          size={24}
          color="black"
          style={{ marginHorizontal: 10 }}
        />
      </View>
    </View>
  );
};
