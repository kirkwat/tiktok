import { RouteProp } from "@react-navigation/native";
import { useState, useContext, useEffect } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import styles from "./styles";
import { Post } from "../../../types";
import ProfileHeader from "../../components/profile/header";
import ProfileNavBar from "../../components/profile/navBar";
import ProfilePostList from "../../components/profile/postList";
import { useUser } from "../../hooks/useUser";
import {
  CurrentUserProfileItemInViewContext,
  FeedStackParamList,
} from "../../navigation/feed";
import { HomeStackParamList } from "../../navigation/home";
import { RootStackParamList } from "../../navigation/main";
import { getPostsByUserId } from "../../services/posts";

type ProfileScreenRouteProp =
  | RouteProp<RootStackParamList, "profileOther">
  | RouteProp<HomeStackParamList, "Me">
  | RouteProp<FeedStackParamList, "feedProfile">;

export default function ProfileScreen({
  route,
}: {
  route: ProfileScreenRouteProp;
}) {
  const { initialUserId } = route.params;
  const [userPosts, setUserPosts] = useState<Post[]>([]);

  let providerUserId = "";
  if (CurrentUserProfileItemInViewContext != null) {
    providerUserId = useContext(CurrentUserProfileItemInViewContext) ?? "";
  }

  const user = useUser(initialUserId ? initialUserId : providerUserId).data;

  useEffect(() => {
    if (user === undefined) {
      return;
    }

    getPostsByUserId(user?.uid).then((posts) => setUserPosts(posts));
  }, [user]);

  if (user === undefined) {
    return <></>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ProfileNavBar user={user} />
      <ScrollView>
        <ProfileHeader user={user} />
        <ProfilePostList posts={userPosts} />
      </ScrollView>
    </SafeAreaView>
  );
}
