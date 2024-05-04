import * as React from "react";
import { FC } from "react";
import { TouchableOpacity, View } from "react-native";
import { navItems } from "./data";
import { useNavigate } from "react-router-native";

interface NavigationProps {
}

const Navigation: FC<NavigationProps> = () => {
  const navigate = useNavigate()
  return (
    <View style={{
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between"
    }}>
      {
        navItems.map(({ icon, path }) => <TouchableOpacity
          key={path}
          onPress={() => navigate(path)}
        >
          {icon}
        </TouchableOpacity>)
      }
    </View>
  );
};

export default Navigation;
