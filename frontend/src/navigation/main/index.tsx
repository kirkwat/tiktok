import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userAuthStateListener } from "../../redux/slices/authSlice"; // Make sure the path is correct
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthScreen from "../../screens/auth";
import { AppDispatch, RootState } from "../../redux/store";
import HomeScreen from "../home";
import { View } from "react-native";

const Stack = createNativeStackNavigator();

export default function Route() {
  const currentUserObj = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(userAuthStateListener());
  }, [dispatch]);
  console.log(currentUserObj);

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
          <Stack.Screen
            name="home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
