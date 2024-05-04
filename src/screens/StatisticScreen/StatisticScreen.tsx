import * as React from "react";
import { FC } from "react";
import { Text, View } from "react-native";
import Navigation from "../../components/Navigation";

interface StatisticScreenProps {
}

const StatisticScreen: FC<StatisticScreenProps> = () => {
  return (
    <View style={{
      display: "flex",
      height: "100%",
      padding: 10,
      justifyContent: "space-between",
    }}>
      <Text>StatisticScreen</Text>
      <Navigation/>
    </View>
  );
};

export default StatisticScreen;
