import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  textInput: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0// Hide the text input
  },
  original: {
    fontSize: 25
  },
  translationContainer: {
    width: "100%",
    paddingVertical: 2,
    paddingHorizontal: 5,
    borderStyle: "solid",
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: "#eee"
  },
  translation:{
    fontSize: 18
  }
});
