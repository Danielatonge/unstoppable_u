import { View, Text } from "react-native";
import React from "react";
import { ProfileHeader } from "../components/ProfileHeader";

export const UserProfile = () => {
  return (
    <>
      <ProfileHeader
        profileMotivation="What's stopping you?"
        backAction={() => {}}
      ></ProfileHeader>
      <View>
        <Text> USER PROFILE</Text>
      </View>
    </>
  );
};
