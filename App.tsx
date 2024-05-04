import ReadingScreen from "./src/screens/ReadingScreen";
import { AppRegistry } from "react-native";
import { NativeRouter, Route, Routes } from "react-router-native";
import MainScreen from "./src/screens/MainScreen";
import { ROUTES_PATH } from "./src/defaults/ROUTES_PATH";
import { Provider } from "react-redux";
import { store } from "./src/store";
import BookScreen from "./src/screens/BookScreen";
import StatisticScreen from "./src/screens/StatisticScreen";
import SettingsScreen from "./src/screens/SettingsScreen";
import UserScreen from "./src/screens/UserScreen";

AppRegistry.registerComponent('appName', () => App)

export default function App() {
  return <Provider store={store}>
    <NativeRouter>
      <Routes>
        <Route path={ROUTES_PATH.main} Component={MainScreen}/>
        <Route path={ROUTES_PATH.book()} Component={BookScreen}/>
        <Route path={ROUTES_PATH.bookReading()} Component={ReadingScreen}/>
        <Route path={ROUTES_PATH.statistic} Component={StatisticScreen}/>
        <Route path={ROUTES_PATH.settings} Component={SettingsScreen}/>
        <Route path={ROUTES_PATH.user} Component={UserScreen}/>
      </Routes>
    </NativeRouter>
  </Provider>
}
