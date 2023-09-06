import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useSelector } from "react-redux";
import styles from "./styles";
import { Ionicons } from "@expo/vector-icons";
import {
  addComment,
  clearCommentListener,
  commentListener,
} from "../../../services/posts";
import CommentItem from "./item";
import { generalStyles } from "../../../styles";
import { RootState } from "../../../redux/store";
import { Post, Comment } from "../../../../types";
import { Avatar } from "react-native-paper";

const CommentModal = ({
  post,
  onCommentSend,
}: {
  post: Post;
  onCommentSend?: () => void;
}) => {
  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState<Comment[]>([]);
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);

  useEffect(() => {
    commentListener(post.id, setCommentList);
    return () => clearCommentListener();
  }, []);

  const handleCommentSend = () => {
    if (comment.length == 0) {
      return;
    }
    setComment("");
    if (currentUser) {
      addComment(post.id, currentUser.uid, comment);
      if (onCommentSend) {
        onCommentSend();
      }
    }
  };

  const renderItem = ({ item }: { item: Comment }) => {
    return <CommentItem item={item} />;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={commentList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <View style={styles.containerInput}>
        {currentUser && currentUser.photoURL ? (
          <Image
            style={generalStyles.avatarSmall}
            source={{ uri: currentUser.photoURL }}
          />
        ) : (
          <Avatar.Icon size={32} icon={"account"} />
        )}
        <TextInput
          value={comment}
          onChangeText={setComment}
          style={styles.input}
        />
        <TouchableOpacity onPress={() => handleCommentSend()}>
          <Ionicons name="arrow-up-circle" size={34} color={"crimson"} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CommentModal;
