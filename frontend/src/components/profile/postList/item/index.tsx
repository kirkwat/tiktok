import { View, Image } from "react-native";
import styles from "./styles";
import { RootState } from "../../../../redux/store";
import { Post } from "../../../../../types";

export default function ProfilePostListItem({ item }: { item: Post | null }) {
  return (
    item && (
      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: item.media[1] }} />
      </View>
    )
  );
}
