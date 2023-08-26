import { FlatList, View, Dimensions, ViewToken } from "react-native";
import styles from "./styles";
import PostSingle, { PostSingleHandles } from "../../components/general/post";
import { useEffect, useRef, useState } from "react";
import { getFeed } from "../../services/posts";
import { Post } from "../../../types";

/**
 * Component that renders a list of posts meant to be
 * used for the feed screen.
 *
 * On start make fetch for posts then use a flatList
 * to display/control the posts.
 */
export default function FeedScreen() {
  const [posts, setPosts] = useState<Post[]>([]);
  const mediaRefs = useRef<Record<string, PostSingleHandles | null>>({});

  useEffect(() => {
    getFeed().then((posts) => setPosts(posts));
  }, []);

  /**
   * Called any time a new post is shown when a user scrolls
   * the FlatList, when this happens we should start playing
   * the post that is viewable and stop all the others
   */
  const onViewableItemsChanged = useRef(
    ({ changed }: { changed: ViewToken[] }) => {
      changed.forEach((element) => {
        const cell = mediaRefs.current[element.key];

        if (cell) {
          if (element.isViewable) {
            cell.play();
          } else {
            cell.stop();
          }
        }
      });
    }
  );

  /**
   * renders the item shown in the FlatList
   *
   * @param {Object} item object of the post
   * @param {Integer} index position of the post in the FlatList
   * @returns
   */
  const renderItem = ({ item, index }: { item: Post; index: number }) => {
    return (
      <View
        //! DON'T HARDCODE THE HEIGHT DIFFERENCE
        style={[
          { flex: 1, height: Dimensions.get("window").height - 80 },
          index % 2 ? { backgroundColor: "blue" } : { backgroundColor: "pink" },
        ]}
      >
        <PostSingle
          item={item}
          ref={(PostSingeRef) => (mediaRefs.current[item.id] = PostSingeRef)}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        windowSize={4}
        initialNumToRender={2}
        maxToRenderPerBatch={2}
        removeClippedSubviews
        viewabilityConfig={{
          itemVisiblePercentThreshold: 100,
        }}
        renderItem={renderItem}
        pagingEnabled
        keyExtractor={(item) => item.id}
        decelerationRate={"fast"}
        onViewableItemsChanged={onViewableItemsChanged.current}
      />
    </View>
  );
}
