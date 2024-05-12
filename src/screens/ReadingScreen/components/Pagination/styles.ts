import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  pagination: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingVertical: 10
  },
  button: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "black",
    paddingHorizontal: 8,
    borderRadius: 4
  },
  pagesCount: {
    fontSize: 28
  }
});
