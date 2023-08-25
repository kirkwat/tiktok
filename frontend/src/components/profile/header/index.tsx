import { View, Text, TouchableOpacity } from "react-native";
import { Avatar } from "react-native-paper";
import { buttonStyles } from "../../../styles";
import styles from "./styles";
import { RootState } from "../../../redux/store";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../navigation/main";

export default function ProfileHeader({
  user,
}: {
  user: RootState["auth"]["currentUser"];
}) {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

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
        <TouchableOpacity
          style={buttonStyles.grayOutlinedButton}
          onPress={() => navigation.navigate("editProfile")}
        >
          <Text>Edit Profile</Text>
        </TouchableOpacity>
      </View>
    )
  );
}
