import * as React from "react";
import { View, StyleSheet, Image, Text, FlatList } from "react-native";
import ChatRoomItem from "../components/ChatRoomItem";
import chatRoomsData from "../assets/dummy-data/ChatRooms";

export default function HomeScreen() {
  return (
    <View style={styles.page}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={chatRoomsData}
        renderItem={({ item }) => <ChatRoomItem chatRoom={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "white",
  },
});
