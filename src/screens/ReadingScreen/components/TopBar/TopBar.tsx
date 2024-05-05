import * as React from "react";
import { FC } from "react";
import { Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { ROUTES_PATH } from "../../../../defaults/ROUTES_PATH";
import { useNavigate, useParams } from "react-router-native";

interface TopBarProps {
  bookName: string
}

const TopBar: FC<TopBarProps> = ({ bookName }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  return (
    <View style={{
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: 10
    }}>
      <MaterialIcons
        name="arrow-back"
        size={24}
        color="black"
        onPress={() => navigate(ROUTES_PATH.book(id))}
      />
      <Text
        style={{
          fontWeight: "900",
          fontSize: 20,
          alignSelf: "center", width: "90%"
      }}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {bookName}
      </Text>
    </View>
  );
};

export default TopBar;
