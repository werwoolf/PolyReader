import * as React from "react";
import { FC } from "react";
import { Text, View } from "react-native";
import { BookStatistic } from "../../../../store/book/types";
import { styles } from "./styles";

interface StatisticProps {
  statistic: BookStatistic | null;
}

const Statistic: FC<StatisticProps> = ({ statistic }) => {
  return (
    <View>
      <Text style={styles.title}>Statistic</Text>
      <View style={styles.property}>
        <Text style={styles.propertyName}>
          Words count:
        </Text>
        <Text>
          {statistic?.totalWords}
        </Text>
      </View>

      <View style={styles.property}>
        <Text style={styles.propertyName}>
          Unique words count:
        </Text>
        <Text>
          {statistic?.uniqueWords}
        </Text>
      </View>
    </View>
  );
};

export default Statistic;
