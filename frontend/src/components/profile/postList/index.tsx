//! FIX ERROR: "VirtualizedLists should never be nested inside plain ScrollViews with the same orientation - use another VirtualizedList-backed container instead."

import { View, FlatList } from "react-native";
import ProfilePostListItem from "./item";
import styles from "./styles";
import { RootState } from "../../../redux/store";

export default function ProfilePostList({
  posts,
}: {
  posts: RootState["post"]["currentUserPosts"];
}) {
  return (
    <View style={styles.container}>
      <FlatList
        numColumns={3}
        removeClippedSubviews
        nestedScrollEnabled
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProfilePostListItem item={item} />}
      />
    </View>
  );
}
