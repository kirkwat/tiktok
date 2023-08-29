import { Image, TouchableOpacity } from "react-native";
import styles from "./styles";
import { Post } from "../../../../../types";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../../navigation/main";

export default function ProfilePostListItem({ item }: { item: Post | null }) {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    item && (
      <TouchableOpacity
        style={styles.container}
        onPress={() =>
          navigation.navigate("userPosts", {
            creator: item.creator,
            profile: true,
          })
        }
      >
        <Image style={styles.image} source={{ uri: item.media[1] }} />
      </TouchableOpacity>
    )
  );
}
