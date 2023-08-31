import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { Text, TouchableOpacity, Image } from "react-native";

import styles from "./styles";
import { SearchUser } from "../../../../types";
import { RootStackParamList } from "../../../navigation/main";

export default function SearchUserItem({ item }: { item: SearchUser }) {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate("profileOther", { initialUserId: item?.uid })
      }
    >
      <Text style={styles.text}>{item.displayName}</Text>
      <Image style={styles.image} source={{ uri: item.photoURL }} />
    </TouchableOpacity>
  );
}
