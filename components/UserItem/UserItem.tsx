import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Image, Text, Pressable } from "react-native";
import styles from "./styles";

export default function UserItem({ user }) {

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
     
      <View style={styles.rightContainer}>
        <View style={styles.row}>
          <Text style={styles.name}>{user.name}</Text>
          
        </View>
      
      </View>
    </Pressable>
  );
}
