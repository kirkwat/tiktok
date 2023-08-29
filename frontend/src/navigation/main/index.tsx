import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userAuthStateListener } from "../../redux/slices/authSlice"; // Make sure the path is correct
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthScreen from "../../screens/auth";
import { AppDispatch, RootState } from "../../redux/store";
import HomeScreen from "../home";
import { View } from "react-native";
import SavePostScreen from "../../screens/savePost";
import EditProfileScreen from "../../screens/profile/edit";
import EditProfileFieldScreen from "../../screens/profile/edit/field";
import Modal from "../../components/modal";

export type RootStackParamList = {
  home: undefined;
  auth: undefined;
  savePost: { source: string; sourceThumb: string };
  editProfile: undefined;
  editProfileField: { title: string; field: string; value: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Route() {
  const currentUserObj = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(userAuthStateListener());
  }, [dispatch]);

  if (!currentUserObj.loaded) {
    return <View></View>;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {currentUserObj.currentUser == null ? (
          <Stack.Screen
            name="auth"
            component={AuthScreen}
            options={{ headerShown: false }}
          />
        ) : (
          <>
            <Stack.Screen
              name="home"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="savePost"
              component={SavePostScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="editProfile"
              component={EditProfileScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="editProfileField"
              component={EditProfileFieldScreen}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
      <Modal />
    </NavigationContainer>
  );
}
