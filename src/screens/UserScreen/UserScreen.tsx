import * as React from "react";
import { FC } from "react";
import { Text } from "react-native";
import Screen from "../../components/Screen"

interface UserScreenProps {
}

const UserScreen: FC<UserScreenProps> = () => {
  return (
    <Screen navigation>
      <Text>UserScreen</Text>
    </Screen>
  );
};

export default UserScreen;
