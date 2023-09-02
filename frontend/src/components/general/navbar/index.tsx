import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./styles";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

interface NavBarGeneralProps {
  title?: string;
  leftButton?: {
    display: boolean;
    name?: keyof typeof Feather.glyphMap;
    action?: () => void;
  };
}

export default function NavBarGeneral({
  title = "NavBarGeneral",
  leftButton = { display: false },
}: NavBarGeneralProps) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Feather name="arrow-left" size={26} />
      </TouchableOpacity>

      <Text style={styles.title}>{title}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          leftButton.display && leftButton.action ? leftButton.action() : null
        }
      >
        <Feather
          name={leftButton.name || "save"}
          size={26}
          color={leftButton.display ? "pink" : "white"}
        />
      </TouchableOpacity>
    </View>
  );
}
