import * as React from "react";
import { FC } from "react";
import { View } from "react-native";
import Navigation from "../Navigation";

interface ScreenProps {
  navigation: boolean;
  children: React.ReactNode;
}

const Screen: FC<ScreenProps> = ({ navigation, children }) => {
  return (
    <View style={{
      height: "100%",
      padding: 10,
      paddingBottom: 20,
      paddingTop: 40

    }}>
      <View style={{
        flexGrow: 1
      }}>
        {children}
      </View>
      {navigation && <Navigation/>}
    </View>
  );
};

export default Screen;
