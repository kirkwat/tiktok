import { useState } from "react";
import { View } from "react-native";
import AuthDetails from "../../components/auth/details";
import AuthMenu from "../../components/auth/menu";
import styles from "./styles";

/**
 * Function that renders a component responsible for being the
 * authentication screen. This is simply a placeholder for
 * the components that actually contains functionalities
 * @returns Component
 */
export default function AuthScreen() {
  const [authPage, setAuthPage] = useState<0 | 1>(0);
  const [detailsPage, setDetailsPage] = useState(false);
  const [menuMessage, setMenuMessage] = useState("");

  return (
    <View style={styles.container}>
      {detailsPage ? (
        <AuthDetails
          authPage={authPage}
          setAuthPage={setAuthPage}
          setMenuMessage={setMenuMessage}
          setDetailsPage={setDetailsPage}
        />
      ) : (
        <AuthMenu
          authPage={authPage}
          menuMessage={menuMessage}
          setAuthPage={setAuthPage}
          setDetailsPage={setDetailsPage}
        />
      )}
    </View>
  );
}
