import React, { useState, useEffect } from "react";

import {
  Text,
  Image,
  Pressable,
  View,
  StyleSheet,
  FlatList,
} from "react-native";
import { Auth, DataStore } from "aws-amplify";
import { ChatRoom, ChatRoomUser } from "../src/models";
import ChatRoomItem from "../components/ChatRoomItem";

export default function TabOneScreen() {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchChatRooms = async () => {
      const userData = await Auth.currentAuthenticatedUser();

      const chatRooms = (await DataStore.query(ChatRoomUser))
        .filter(
          (chatRoomUser) => chatRoomUser.user.id === userData.attributes.sub
        )
        .map((chatRoomUser) => chatRoomUser.chatroom);

      setChatRooms(chatRooms);
    };
    fetchChatRooms();
  }, []);

  const getData = () => {
    setIsLoading(true);
    const fetchChatRooms = async () => {
      const userData = await Auth.currentAuthenticatedUser();

      const chatRooms = (await DataStore.query(ChatRoomUser))
        .filter(
          (chatRoomUser) => chatRoomUser.user.id === userData.attributes.sub
        )
        .map((chatRoomUser) => chatRoomUser.chatroom);

      setChatRooms(chatRooms);
    };
    fetchChatRooms();
    setIsLoading(false);
  };

  const logOut = async () => {
    await DataStore.clear();
    Auth.signOut();
  };

  return (
    <View style={styles.page}>
      <FlatList
        data={chatRooms}
        renderItem={({ item }) => <ChatRoomItem chatRoom={item} />}
        showsVerticalScrollIndicator={false}
        refreshing={isLoading}
        onRefresh={getData}
      />
      <Pressable
        onPress={logOut}
        style={{
          height: 50,
          margin: 10,
          borderRadius: 5,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text>Logout</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    flex: 1,
  },
});
