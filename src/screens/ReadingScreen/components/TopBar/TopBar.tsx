import * as React from "react";
import { FC, useCallback } from "react";
import { Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { ROUTES_PATH } from "../../../../defaults/ROUTES_PATH";
import { styles } from "./styles";
import { useNavigate, useParams } from "react-router-native";

interface TopBarProps {
  bookName: string
}

const TopBar: FC<TopBarProps> = ({ bookName }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleGoToBook = useCallback(() => navigate(ROUTES_PATH.book(id)), [id, navigate]);

  return (
    <View style={styles.container}>
      <MaterialIcons
        name="arrow-back"
        size={24}
        color="black"
        onPress={handleGoToBook}
      />
      <Text
        style={styles.bookName}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {bookName}
      </Text>
    </View>
  );
};

export default TopBar;
