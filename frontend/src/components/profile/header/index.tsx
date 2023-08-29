import { View, Text, TouchableOpacity } from "react-native";
import { Avatar } from "react-native-paper";
import { buttonStyles } from "../../../styles";
import styles from "./styles";
import { RootState } from "../../../redux/store";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../navigation/main";
import { FIREBASE_AUTH } from "../../../../firebaseConfig";
import { useFollowing } from "../../../hooks/useFollowing";
import { Feather } from "@expo/vector-icons";
import { useFollowingMutation } from "../../../hooks/useFollowingMutation";

/**
 * Renders the header of the user profile and
 * handles all of the actions within it like follow, unfollow and
 * routing to the user settings.
 *
 * @param {Object} props
 * @param {Object} props.user information of the user to display
 * @returns
 */
export default function ProfileHeader({
  user,
}: {
  user: RootState["auth"]["currentUser"];
}) {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  let isFollowing = false;
  if (FIREBASE_AUTH.currentUser?.uid && user?.uid) {
    isFollowing =
      useFollowing(FIREBASE_AUTH.currentUser?.uid, user?.uid).data ?? false;
  }

  const isFollowingMutation = useFollowingMutation();

  const renderFollowButton = () => {
    if (isFollowing) {
      return (
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity style={buttonStyles.grayOutlinedButton}>
            <Text style={buttonStyles.grayOutlinedButtonText}>Message</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={buttonStyles.grayOutlinedIconButton}
            onPress={() => {
              if (user?.uid) {
                isFollowingMutation.mutate({
                  otherUserId: user.uid,
                  isFollowing,
                });
              }
            }}
          >
            <Feather name="user-check" size={20} />
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <TouchableOpacity
          style={buttonStyles.filledButton}
          onPress={() => {
            if (user?.uid) {
              isFollowingMutation.mutate({
                otherUserId: user.uid,
                isFollowing,
              });
            }
          }}
        >
          <Text style={buttonStyles.filledButtonText}>Follow</Text>
        </TouchableOpacity>
      );
    }
  };

  return (
    user && (
      <View style={styles.container}>
        <Avatar.Icon size={80} icon={"account"} />
        <Text style={styles.emailText}>{user.email}</Text>
        <View style={styles.counterContainer}>
          <View style={styles.counterItemContainer}>
            <Text style={styles.counterNumberText}>0</Text>
            <Text style={styles.counterLabelText}>Following</Text>
          </View>
          <View style={styles.counterItemContainer}>
            <Text style={styles.counterNumberText}>0</Text>
            <Text style={styles.counterLabelText}>Followers</Text>
          </View>
          <View style={styles.counterItemContainer}>
            <Text style={styles.counterNumberText}>0</Text>
            <Text style={styles.counterLabelText}>Likes</Text>
          </View>
        </View>
        {FIREBASE_AUTH.currentUser?.uid === user.uid ? (
          <TouchableOpacity
            style={buttonStyles.grayOutlinedButton}
            onPress={() => navigation.navigate("editProfile")}
          >
            <Text style={buttonStyles.grayOutlinedButtonText}>
              Edit Profile
            </Text>
          </TouchableOpacity>
        ) : (
          renderFollowButton()
        )}
      </View>
    )
  );
}
