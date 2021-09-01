import * as React from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  FlatList,
  Pressable,
} from "react-native";
import { Auth, DataStore } from "aws-amplify";
import ChatRoomItem from "../components/ChatRoomItem";
import chatRoomsData from "../assets/dummy-data/ChatRooms";
import { useState } from "react";
import { ChatRoom, ChatRoomUser } from "../src/models";
import { useEffect } from "react";

export default function HomeScreen() {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);

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
  const logOut = () => {
    Auth.signOut();
  };
  return (
    <View style={styles.page}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={chatRooms}
        renderItem={({ item }) => <ChatRoomItem chatRoom={item} />}
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
    flex: 1,
    backgroundColor: "white",
  },
});
