import * as React from "react";
import { FC } from "react";
import { View } from "react-native";
import Navigation from "../Navigation";
import { styles } from "./styles";

interface ScreenProps {
  navigation: boolean;
  children: React.ReactNode;
}

const Screen: FC<ScreenProps> = ({ navigation, children }) => {
  return (
    <View style={styles.container}>
      <View style={styles.children}>
        {children}
      </View>
      {navigation && <Navigation/>}
    </View>
  );
};

export default Screen;
