import { Feather } from "@expo/vector-icons";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { View } from "react-native";

import { FIREBASE_AUTH } from "../../../firebaseConfig";
import CameraScreen from "../../screens/camera";
import ProfileScreen from "../../screens/profile";
import SearchScreen from "../../screens/search";
import FeedNavigation from "../feed";

export type HomeStackParamList = {
  feed: undefined;
  Discover: undefined;
  Add: undefined;
  Inbox: undefined;
  Me: { initialUserId: string };
};

const Tab = createMaterialBottomTabNavigator<HomeStackParamList>();

const EmptyScreen = () => {
  return <View />;
};

export default function HomeScreen() {
  return (
    <Tab.Navigator
      barStyle={{ backgroundColor: "black" }}
      initialRouteName="feed"
    >
      <Tab.Screen
        name="feed"
        component={FeedNavigation}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="home" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Discover"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="search" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Add"
        component={CameraScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="plus-square" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Inbox"
        component={EmptyScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="message-square" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Me"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="user" size={24} color={color} />
          ),
        }}
        initialParams={{ initialUserId: FIREBASE_AUTH.currentUser?.uid }}
      />
    </Tab.Navigator>
  );
}
