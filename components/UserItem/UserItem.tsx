import { useNavigation } from "@react-navigation/native";
import { Auth, DataStore } from "aws-amplify";
import React from "react";
import { View, Image, Text, Pressable } from "react-native";
import { ChatRoom, User } from "../../src/models";
import styles from "./styles";

export default function UserItem({ user }) {
  const navigation = useNavigation();

  const onPress = async () => {
    const newChatRoom = await DataStore.save(new ChatRoom({ newMessages: 0 }));

    const authUser = await Auth.currentAuthenticatedUser();
    const dbUser = await DataStore.query(User, authUser.attributes.sub);
    console.log(dbUser);
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
