import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { FlatList, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import ChatSingleItem from "../../../components/chat/single/item";
import { useMessages } from "../../../hooks/useMessages";
import { SafeAreaView } from "react-native-safe-area-context";
import NavBarGeneral from "../../../components/general/navbar";
import { sendMessage } from "../../../services/chat";
import { RootStackParamList } from "../../../navigation/main";
import { RouteProp } from "@react-navigation/native";
import { Message } from "../../../../types";

const ChatSingleScreen = ({
  route,
}: {
  route: RouteProp<RootStackParamList, "chatSingle">;
}) => {
  const { chatId, contactId } = route.params;
  const [message, setMessage] = useState("");

  const { messages, chatIdInst } = useMessages(chatId, contactId);

  const handleMessageSend = () => {
    if (message.length == 0 || !chatIdInst) {
      return;
    }

    setMessage("");
    sendMessage(chatIdInst, message);
  };

  const renderItem = ({ item }: { item: Message }) => {
    return <ChatSingleItem item={item} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <NavBarGeneral title="Chat" />
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        inverted
      />
      <View style={styles.containerInput}>
        <TextInput
          value={message}
          onChangeText={setMessage}
          placeholder="Send Message..."
          style={styles.input}
        />
        <TouchableOpacity onPress={() => handleMessageSend()}>
          <Ionicons name="arrow-up-circle" size={34} color={"crimson"} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ChatSingleScreen;
