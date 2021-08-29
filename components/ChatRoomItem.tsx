import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";

export default function ChatRoomItem() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/elon.png",
        }}
      />
      <View style={styles.badgeContainer}>
        <Text style={styles.badgeText}>3</Text>
      </View>
      <View style={styles.rightContainer}>
        <View style={styles.row}>
          <Text style={styles.name}>Elon Musk</Text>
          <Text style={styles.text}>11:11 AM</Text>
        </View>
        <Text style={styles.text} numberOfLines={1}>
          Hola Hola Coca Cola
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {},
  container: {
    flexDirection: "row",
    padding: 10,
  },
  badgeContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3872E9",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "white",
    width: 20,
    height: 20,
    position: "absolute",
    left: 45,
    top: 10,
  },
  badgeText: {
    color: "white",
    fontSize: 12,
  },
  rightContainer: {
    flex: 1,
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 30,
    marginRight: 10,
  },
  name: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 3,
  },

  text: {
    color: "grey",
  },
});
