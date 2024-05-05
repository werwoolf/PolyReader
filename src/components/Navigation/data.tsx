import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import { Icon } from "@expo/vector-icons/build/createIconSet";
import { ROUTES_PATH } from "../../defaults/ROUTES_PATH";

type NavItem = {
  path: string, icon: Icon<any, any>, name: string
}

export const navItems: NavItem[] = [
  {
    path: ROUTES_PATH.main,
    icon: AntDesign,
    name: "book"
  },
  {
    path: ROUTES_PATH.statistic,
    icon: Entypo,
    name: "bar-graph"
  },
  {
    path: ROUTES_PATH.settings,
    icon: Feather,
    name: "settings"
  },
  {
    path: ROUTES_PATH.user,
    icon: AntDesign,
    name: "user"
  }
];
