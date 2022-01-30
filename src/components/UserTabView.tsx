import { View, Text, useColorScheme } from "react-native";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { getColorScheme } from "../helpers";
import { Track } from "./Track";
import { Mentor } from "./Mentor";
import { Bookmark } from "./Bookmark";

const Profile = createMaterialTopTabNavigator();

function ProfileTabs() {
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
      <Profile.Screen name="Track" component={Track} />
      <Profile.Screen name="Mentors" component={Mentor} />
      <Profile.Screen name="Bookmarks" component={Bookmark} />
    </Profile.Navigator>
  );
}
export const UserTabView = () => {
  return <ProfileTabs />;
};
