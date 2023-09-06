import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useUser } from "../../../../hooks/useUser";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import { FIREBASE_AUTH } from "../../../../../firebaseConfig";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../../navigation/main";
import { Chat } from "../../../../../types";

const ChatListItem = ({ chat }: { chat: Chat }) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { data: userData } = useUser(
    FIREBASE_AUTH.currentUser &&
      chat.members[0] === FIREBASE_AUTH.currentUser.uid
      ? chat.members[1]
      : chat.members[0]
  );

  const date = new Date(chat.lastUpdate.seconds * 1000);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate("chatSingle", { chatId: chat.id })}
    >
      {userData && (
        <Image style={styles.image} source={{ uri: userData.photoURL }} />
      )}
      <View style={{ flex: 1 }}>
        {userData && (
          <Text style={styles.userDisplayName}>{userData.displayName}</Text>
        )}
        <Text style={styles.lastMessage}>{chat.lastMessage}</Text>
      </View>
      <Text>
        {chat.lastUpdate
          ? `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
          : "Now"}
      </Text>
    </TouchableOpacity>
  );
};

export default ChatListItem;
