import { ROUTES_PATH } from "../../defaults/ROUTES_PATH";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import * as React from "react";

export const navItems = [
  { path: ROUTES_PATH.main, icon: <AntDesign name="book" size={28} color="black"/> },
  { path: ROUTES_PATH.statistic, icon: <Entypo name="bar-graph" size={28} color="black"/> },
  { path: ROUTES_PATH.settings, icon: <Feather name="settings" size={24} color="black"/> },
  { path: ROUTES_PATH.user, icon: <AntDesign name="user" size={24} color="black" /> },
]
