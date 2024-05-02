import ReadingScreen from "./src/screens/ReadingScreen";
import { AppRegistry } from "react-native";
import { NativeRouter, Route, Routes } from "react-router-native";
import MainScreen from "./src/screens/MainScreen";
import { ROUTES_PATH } from "./src/defaults/ROUTES_PATH";
import { Provider } from "react-redux";
import { store } from "./src/store";
import BookScreen from "./src/screens/BookScreen";

AppRegistry.registerComponent('appName', () => App)

export default function App() {
  return <Provider store={store}>
    <NativeRouter>
      <Routes>
        <Route path={ROUTES_PATH.main} Component={MainScreen}/>
        <Route path={ROUTES_PATH.book()} Component={BookScreen}/>
        <Route path={ROUTES_PATH.bookReading()} Component={ReadingScreen}/>
      </Routes>
    </NativeRouter>
  </Provider>
}
