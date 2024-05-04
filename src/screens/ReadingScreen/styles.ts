import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingLeft: 5,
    paddingRight: 5,
    marginTop: 40,
    position: "relative"
  },
  original: {
    fontSize: 25
  },
  translation:{
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderStyle: "solid",
    borderColor: "grey",
    borderWidth: 2,
    backgroundColor: "#ccc"
  }
});
