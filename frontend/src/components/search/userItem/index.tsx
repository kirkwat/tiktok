import React from "react";
import { Text, TouchableOpacity, Image } from "react-native";
import styles from "./styles";
import { SearchUser } from "../../../../types";

export default function SearchUserItem({ item }: { item: SearchUser }) {
  return (
    <TouchableOpacity style={styles.container}>
      <Text style={styles.text}>{item.displayName}</Text>
      <Image style={styles.image} source={{ uri: item.photoURL }} />
    </TouchableOpacity>
  );
}
