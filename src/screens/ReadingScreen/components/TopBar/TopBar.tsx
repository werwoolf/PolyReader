import * as React from "react";
import { FC } from "react";
import { Text, View } from "react-native";

interface TopBarProps {
  activeWordIndex: number | null;
  setActiveWordIndex: (index: number | null) => void;
}

const TopBar: FC<TopBarProps> = ({
                                   activeWordIndex,
                                   setActiveWordIndex
                                 }) => {
  return (
    <View style={{
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignContent: "center",
      paddingHorizontal: 20,
      height: 35
    }}>
      <Text style={{ fontWeight: "900", fontSize: 30 }}>{"⇦"}</Text>
      <Text style={{ fontWeight: "900", fontSize: 20 }}>
        {"Book name"}
      </Text>
      {
        activeWordIndex
          ? <Text
            style={{ fontWeight: "900", fontSize: 30, paddingHorizontal: 15 }}
            onPress={() => {
              setActiveWordIndex(null)
            }}
          >
            ⇧
        </Text>
          : null
      }
    </View>
  );
};

export default TopBar;
