import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Dispatch, SetStateAction, createContext, useState } from "react";

import FeedScreen from "../../screens/feed";
import ProfileScreen from "../../screens/profile";

export type FeedStackParamList = {
  feedList: {
    setCurrentUserProfileItemInView: Dispatch<SetStateAction<string | null>>;
    creator: string;
    profile: boolean;
  };
  feedProfile: { initialUserId: string };
};

const { Screen, Navigator } =
  createMaterialTopTabNavigator<FeedStackParamList>();

export const CurrentUserProfileItemInViewContext = createContext<string | null>(
  null,
);

const FeedNavigation = () => {
  const [currentUserProfileItemInView, setCurrentUserProfileItemInView] =
    useState<string | null>(null);

  return (
    <CurrentUserProfileItemInViewContext.Provider
      value={currentUserProfileItemInView}
    >
      <Navigator initialRouteName="feedList" tabBar={() => <></>}>
        <Screen
          name="feedList"
          component={FeedScreen}
          initialParams={{ setCurrentUserProfileItemInView, profile: false }}
        />
        <Screen
          name="feedProfile"
          component={ProfileScreen}
          initialParams={{ initialUserId: "" }}
        />
      </Navigator>
    </CurrentUserProfileItemInViewContext.Provider>
  );
};

export default FeedNavigation;
