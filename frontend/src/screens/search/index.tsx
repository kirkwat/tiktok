import React, { useEffect, useState } from "react";
import { TextInput, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchUserItem from "../../components/search/userItem";
import { queryUsersByEmail } from "../../services/user";
import styles from "./styles";
import { SearchUser } from "../../../types";

export default function SearchScreen() {
  const [textInput, setTextInput] = useState("");
  const [searchUsers, setSearchUsers] = useState<SearchUser[]>([]);

  useEffect(() => {
    queryUsersByEmail(textInput).then((users) => setSearchUsers(users));
  }, [textInput]);

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        onChangeText={setTextInput}
        style={styles.textInput}
        placeholder={"Search"}
      />
      <FlatList
        data={searchUsers}
        renderItem={({ item }) => <SearchUserItem item={item} />}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}
