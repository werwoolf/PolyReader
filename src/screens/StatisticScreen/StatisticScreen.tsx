import * as React from "react";
import { FC } from "react";
import { Text } from "react-native";
import Screen from "../../components/Screen";

interface StatisticScreenProps {
}

const StatisticScreen: FC<StatisticScreenProps> = () => {
  return (
    <Screen navigation>
      <Text>StatisticScreen</Text>
    </Screen>
  );
};

export default StatisticScreen;
