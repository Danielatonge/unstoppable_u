import { View, Text, useColorScheme } from "react-native";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { getColorScheme } from "../../helpers";
import { Track } from "./Track";
import { Mentor } from "./Mentor";
import { Bookmark } from "./Bookmark";

const Profile = createMaterialTopTabNavigator();

function ProfileTabs({ userId, isLoggedInUserProfile }) {
  const scheme = useColorScheme();
  const { theme } = getColorScheme("AUTOMATIC", scheme);
  const colors = theme.colors;

  return (
    <Profile.Navigator
      initialRouteName="Track"
      screenOptions={{
        tabBarLabelStyle: {
          textTransform: "none",
          fontSize: 15,
          fontWeight: "600",
        },
        tabBarIndicatorStyle: { backgroundColor: colors.accent },
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.text,
      }}
    >
      <Profile.Screen
        name="Track"
        component={Track}
        initialParams={{ userId: userId }}
      />
      <Profile.Screen
        name="Mentors"
        component={Mentor}
        initialParams={{ userId: userId }}
      />
      {isLoggedInUserProfile && (
        <Profile.Screen
          name="Bookmarks"
          component={Bookmark}
          initialParams={{ userId: userId }}
        />
      )}
    </Profile.Navigator>
  );
}
export const UserTabView = ({ userId, isLoggedInUserProfile }) => {
  return (
    <ProfileTabs
      userId={userId}
      isLoggedInUserProfile={isLoggedInUserProfile}
    />
  );
};

// nesting navigators
// navigation.navigate("Account", {
//   screen: "Settings",
//   params: { user: "jane" },
// });
