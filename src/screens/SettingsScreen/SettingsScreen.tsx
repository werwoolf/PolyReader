import * as React from "react";
import { FC } from "react";
import { Text } from "react-native";
import Screen from "../../components/Screen";

interface SettingsScreenProps {
}

const SettingsScreen: FC<SettingsScreenProps> = () => {
  return (
    <Screen navigation>
      <Text>SettingsScreen</Text>
    </Screen>
  );
};

export default SettingsScreen;
