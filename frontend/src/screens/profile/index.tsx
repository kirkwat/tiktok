import { ScrollView } from "react-native";
import styles from "./styles";
import ProfileNavBar from "../../components/profile/navBar";
import ProfileHeader from "../../components/profile/header";
import ProfilePostList from "../../components/profile/postList";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useContext, useEffect } from "react";
import {
  CurrentUserProfileItemInViewContext,
  FeedStackParamList,
} from "../../navigation/feed";
import { useUser } from "../../hooks/useUser";
import { getPostsByUserId } from "../../services/posts";
import { Post } from "../../../types";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../navigation/main";
import { HomeStackParamList } from "../../navigation/home";

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

  let providerUserId = null;
  if (CurrentUserProfileItemInViewContext != null) {
    providerUserId = useContext(CurrentUserProfileItemInViewContext);
  }

  const user = useUser(initialUserId ? initialUserId : providerUserId).data;

  useEffect(() => {
    if (user === undefined) {
      return;
    }
    console.log("USER: ", user);
    console.log("PROVIDERUSERID: " + providerUserId);
    console.log("INITIALUSERID: " + initialUserId);
    console.log("UID BEFORE: " + user?.uid);
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
