import React from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import Message from "../components/Message";
import ChatRoomData from "../assets/dummy-data/Chats";
import MessageInput from "../components/MessageInput";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
import { Message as MessageModel } from "../src/models";
import { useEffect } from "react";
import { DataStore } from "@aws-amplify/datastore";
import { ChatRoom } from "../src/models";
import { SortDirection } from "aws-amplify";

export default function ChatRoomScreen() {
  const [messages, setMessages] = useState<MessageModel[]>([]);
  const [chatRoom, setChatRoom] = useState<ChatRoom | null>(null);

  const route = useRoute();
  const navigation = useNavigation();

  useEffect(() => {
    fetchChatRoom();
  }, []);

  useEffect(() => {
    if (!chatRoom) {
      return;
    }
    fetchMessages();
  }, [chatRoom]);

  const fetchChatRoom = async () => {
    if (!route.params?.id) {
      console.warn("No chatroom id provided");
      return;
    }
    const chatRoom = await DataStore.query(ChatRoom, route.params.id);
    if (!chatRoom) {
      console.error("Could not find ChatRoomId with this ID");
    } else {
      setChatRoom(chatRoom);
    }
    // const fetchedMessages = await DataStore.query(MessageModel);
  };

  const fetchMessages = async () => {
    if (!chatRoom) {
      return;
    }
    const fetchedMessages = await DataStore.query(
      MessageModel,
      (message) => message.chatroomID("eq", chatRoom?.id),
      {
        sort: (message) => message.createdAt(SortDirection.DESCENDING),
      }
    );
    setMessages(fetchedMessages);
  };
  navigation.setOptions({ title: "Elon Musk" });

  if (!chatRoom) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.page}>
      <FlatList
        data={messages}
        renderItem={({ item }) => <Message message={item} />}
        inverted
      />
      <MessageInput chatRoom={chatRoom} />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "white",
  },
});
