import * as React from "react";
import { FC } from "react";
import { View, Text } from "react-native";
import Navigation from "../../components/Navigation";

interface SettingsScreenProps {
}

const SettingsScreen: FC<SettingsScreenProps> = () => {
  return (
    <View style={{
      display: "flex",
      height: "100%",
      padding: 10,
      justifyContent: "space-between",
    }}>
      <Text>SettingsScreen</Text>
      <Navigation/>
    </View>
  );
};

export default SettingsScreen;
