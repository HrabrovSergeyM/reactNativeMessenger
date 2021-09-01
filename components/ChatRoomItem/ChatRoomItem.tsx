import { useNavigation } from "@react-navigation/native";
import { Auth, DataStore } from "aws-amplify";
import React, { useState } from "react";
import { useEffect } from "react";
import { View, Image, Text, Pressable, ActivityIndicator } from "react-native";
import { ChatRoomUser } from "../../src/models";
import { User } from "../../src/models";
import styles from "./styles";

export default function ChatRoomItem({ chatRoom }) {
  const [users, setUsers] = useState<User[]>([]);
  const [user, setUser] = useState<User | null>(null);

  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate("ChatRoom", { id: chatRoom.id });
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = (await DataStore.query(ChatRoomUser))
        .filter((chatRoomUser) => chatRoomUser.chatroom.id === chatRoom.id)
        .map((chatRoomUser) => chatRoomUser.user);

      // setUsers(fetchedUsers);

      const authUser = await Auth.currentAuthenticatedUser();
      setUser(
        fetchedUsers.find((user) => user.id !== authUser.attributes.sub) || null
      );
    };
    fetchUsers();
  }, []);

  if (!user) {
    return <ActivityIndicator />;
  }

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: user.imageUri,
        }}
      />
      {Boolean(chatRoom.newMessages) ? (
        <View style={styles.badgeContainer}>
          <Text style={styles.badgeText}>{chatRoom.newMessages}</Text>
        </View>
      ) : null}
      <View style={styles.rightContainer}>
        <View style={styles.row}>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.text}>{chatRoom.lastMessage?.createdAt}</Text>
        </View>
        <Text style={styles.text} numberOfLines={1}>
          {chatRoom.lastMessage?.content}
        </Text>
      </View>
    </Pressable>
  );
}
