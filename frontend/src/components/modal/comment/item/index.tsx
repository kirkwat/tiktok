import React from "react";
import { View, Text, Image } from "react-native";
import { useUser } from "../../../../hooks/useUser";
import { generalStyles } from "../../../../styles";
import styles from "./styles";
import { Comment } from "../../../../../types";

const CommentItem = ({ item }: { item: Comment }) => {
  const user = useUser(item.creator).data;

  return (
    <View style={styles.container}>
      {user && (
        <Image
          style={generalStyles.avatarSmall}
          source={{ uri: user.photoURL }}
        />
      )}

      <View style={styles.containerText}>
        {user && <Text style={styles.displayName}>{user.displayName}</Text>}
        <Text>{item.comment}</Text>
      </View>
    </View>
  );
};

export default CommentItem;
