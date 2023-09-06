import React from "react";
import { Text, TouchableOpacity, Image } from "react-native";
import styles from "./styles";
import { SearchUser } from "../../../../types";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../navigation/main";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Avatar } from "react-native-paper";

export default function SearchUserItem({ item }: { item: SearchUser }) {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate("profileOther", { initialUserId: item?.uid ?? "" })
      }
    >
      <Text style={styles.text}>{item.displayName || item.email}</Text>
      {item.photoURL ? (
        <Image style={styles.image} source={{ uri: item.photoURL }} />
      ) : (
        <Avatar.Icon size={40} icon={"account"} />
      )}
    </TouchableOpacity>
  );
}
