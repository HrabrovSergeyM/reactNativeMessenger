import * as React from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  FlatList,
  Pressable,
} from "react-native";
import Users from "../assets/dummy-data/Users";
import UserItem from "../components/UserItem";

export default function UsersScreen() {
  return (
    <View style={styles.page}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={Users}
        renderItem={({ item }) => <UserItem user={item} />}
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
