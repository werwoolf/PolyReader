import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 20,
    marginTop: 40,
    position: "relative"
  },
  translation: {
    height: 50,
    borderBottomWidth: 2,
    borderBottomColor: "rgba(122, 122, 122, .5)",
    // position: "absolute",
    paddingTop: 20,
    top: 0,
    left: 0,
    zIndex: 10,
    backgroundColor: "#fff"
  },
  wordTranslation: {
    // position: "absolute",
    // top: 50,
    width: "100%",
    zIndex: 10,
    backgroundColor: "#fff",
    paddingHorizontal: 5
  },
  original: {
    // marginTop: 50,
    fontSize: 25,
    zIndex: 9
  },
  pagination: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30
  }
});
