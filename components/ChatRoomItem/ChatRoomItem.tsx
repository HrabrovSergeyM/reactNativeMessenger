import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Image, Text, Pressable } from "react-native";
import styles from "./styles";

export default function ChatRoomItem({ chatRoom }) {
  const user = null

  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate("ChatRoom", { id: chatRoom.id });
  };

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
          <Text style={styles.text}>{chatRoom.lastMessage.createdAt}</Text>
        </View>
        <Text style={styles.text} numberOfLines={1}>
          {chatRoom.lastMessage.content}
        </Text>
      </View>
    </Pressable>
  );
}
