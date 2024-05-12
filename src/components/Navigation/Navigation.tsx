import * as React from "react";
import { FC } from "react";
import { TouchableOpacity, View } from "react-native";
import { navItems } from "./data";
import { styles } from "./styles";
import { useLocation, useNavigate } from "react-router-native";

interface NavigationProps {
}

const Navigation: FC<NavigationProps> = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <View style={styles.container}>
      {
        navItems.map(({ icon: Icon, name, path }) => <TouchableOpacity
          key={path}
          onPress={() => navigate(path)}
          style={styles.iconContainer}
        >
          <Icon
            name={name}
            size={26}
            color={path === pathname ? "black" : "grey"}
          />
        </TouchableOpacity>)
      }
    </View>
  );
};

export default Navigation;
