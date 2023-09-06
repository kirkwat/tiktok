import React from "react";
import { View, Text, Image } from "react-native";
import { useUser } from "../../../../hooks/useUser";
import { generalStyles } from "../../../../styles";
import styles from "./styles";
import { FIREBASE_AUTH } from "../../../../../firebaseConfig";
import { Message } from "../../../../../types";
import { Avatar } from "react-native-paper";

const ChatSingleItem = ({ item }: { item: Message }) => {
  const { data: userData, isLoading } = useUser(item.creator);

  if (isLoading) {
    return <></>;
  }

  const isCurrentUser =
    FIREBASE_AUTH.currentUser && item.creator === FIREBASE_AUTH.currentUser.uid;

  return (
    <View
      style={isCurrentUser ? styles.containerCurrent : styles.containerOther}
    >
      {userData && userData.photoURL ? (
        <Image
          style={generalStyles.avatarSmall}
          source={{ uri: userData.photoURL }}
        />
      ) : (
        <Avatar.Icon size={32} icon={"account"} />
      )}
      <View
        style={
          isCurrentUser
            ? styles.containerTextCurrent
            : styles.containerTextOther
        }
      >
        <Text style={styles.text}>{item.message}</Text>
      </View>
    </View>
  );
};

export default ChatSingleItem;
