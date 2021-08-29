import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
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

export default styles;
