import * as React from "react";
import { FC } from "react";
import { Text, View } from "react-native";
import Navigation from "../../components/Navigation";

interface UserScreenProps {
}

const UserScreen: FC<UserScreenProps> = () => {
  return (
    <View style={{
      display: "flex",
      height: "100%",
      padding: 10,
      justifyContent: "space-between",
    }}>
      <Text>UserScreen</Text>
      <Navigation/>
    </View>
  );
};

export default UserScreen;
