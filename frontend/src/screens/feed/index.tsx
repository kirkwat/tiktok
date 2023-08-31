import { RouteProp } from "@react-navigation/native";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { FlatList, View, Dimensions, ViewToken } from "react-native";

import styles from "./styles";
import { Post } from "../../../types";
import PostSingle, { PostSingleHandles } from "../../components/general/post";
import useMaterialNavBarHeight from "../../hooks/useMaterialNavBarHeight";
import { FeedStackParamList } from "../../navigation/feed";
import { HomeStackParamList } from "../../navigation/home";
import { RootStackParamList } from "../../navigation/main";
import { getFeed, getPostsByUserId } from "../../services/posts";

type FeedScreenRouteProp =
  | RouteProp<RootStackParamList, "userPosts">
  | RouteProp<HomeStackParamList, "feed">
  | RouteProp<FeedStackParamList, "feedList">;

interface PostViewToken extends ViewToken {
  item: Post;
}

/**
 * Component that renders a list of posts meant to be
 * used for the feed screen.
 *
 * On start make fetch for posts then use a flatList
 * to display/control the posts.
 */
export default function FeedScreen({ route }: { route: FeedScreenRouteProp }) {
  const { setCurrentUserProfileItemInView, creator, profile } =
    route.params as {
      setCurrentUserProfileItemInView: Dispatch<SetStateAction<string | null>>;
      creator: string;
      profile: boolean;
    };

  const [posts, setPosts] = useState<Post[]>([]);
  const mediaRefs = useRef<Record<string, PostSingleHandles | null>>({});

  useEffect(() => {
    if (profile && creator) {
      getPostsByUserId(creator).then((posts) => setPosts(posts));
    } else {
      getFeed().then((posts) => setPosts(posts));
    }
  }, []);

  /**
   * Called any time a new post is shown when a user scrolls
   * the FlatList, when this happens we should start playing
   * the post that is viewable and stop all the others
   */
  const onViewableItemsChanged = useRef(
    ({ changed }: { changed: PostViewToken[] }) => {
      changed.forEach((element) => {
        const cell = mediaRefs.current[element.key];

        if (cell) {
          if (element.isViewable) {
            if (!profile && setCurrentUserProfileItemInView) {
              setCurrentUserProfileItemInView(element.item.creator);
            }
            cell.play();
          } else {
            cell.stop();
          }
        }
      });
    },
  );

  const feedItemHeight =
    Dimensions.get("window").height - useMaterialNavBarHeight(profile);
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
        style={{
          height: feedItemHeight,
          backgroundColor: "black",
        }}
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
          itemVisiblePercentThreshold: 0,
        }}
        renderItem={renderItem}
        pagingEnabled
        keyExtractor={(item) => item.id}
        decelerationRate="fast"
        onViewableItemsChanged={onViewableItemsChanged.current}
      />
    </View>
  );
}
