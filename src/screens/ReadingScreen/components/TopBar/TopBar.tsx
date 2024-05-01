import * as React from "react";
import { FC } from "react";
import { Text, View } from "react-native";
import { useNavigate } from "react-router-native";
import { ROUTES_PATH } from "../../../../defaults/ROUTES_PATH";

interface TopBarProps {
  bookName: string
}

const TopBar: FC<TopBarProps> = ({ bookName }) => {
  const navigate = useNavigate();
  return (
    <View style={{
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignContent: "center",
      paddingHorizontal: 20
    }}>
      <Text
        style={{ fontWeight: "900", fontSize: 30 }}
        onPress={()=> navigate(ROUTES_PATH.main)}
      >
        {"⇦"}
      </Text>
      <Text style={{ fontWeight: "900", fontSize: 20, alignSelf:"center" }}>
        {bookName}
      </Text>
    </View>
  );
};

export default TopBar;
