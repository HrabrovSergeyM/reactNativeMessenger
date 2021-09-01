import { useNavigation } from "@react-navigation/native";
import { Auth, DataStore } from "aws-amplify";
import React from "react";
import { View, Image, Text, Pressable } from "react-native";
import { ChatRoom, User, ChatRoomUser } from "../../src/models";
import styles from "./styles";

export default function UserItem({ user }) {
  const navigation = useNavigation();

  const onPress = async () => {
    const newChatRoom = await DataStore.save(new ChatRoom({ newMessages: 0 }));

    const authUser = await Auth.currentAuthenticatedUser();
    const dbUser = await DataStore.query(User, authUser.attributes.sub);

    await DataStore.save(
      new ChatRoomUser({
        user: dbUser,
        chatroom: newChatRoom,
      })
    );

    await DataStore.save(
      new ChatRoomUser({
        user,
        chatroom: newChatRoom,
      })
    );
    navigation.navigate("ChatRoom", { id: newChatRoom.id });
  };

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: user.imageUri,
        }}
      />
      <View style={styles.rightContainer}>
        <View style={styles.row}>
          <Text style={styles.name}>{user.name}</Text>
        </View>
      </View>
    </Pressable>
  );
}
