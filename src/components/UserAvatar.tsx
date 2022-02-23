import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Avatar } from "./Avatar";
import { useNavigation } from "@react-navigation/native";
import { UserBadge } from "./Badge/UserBadge";

export interface Props {
  imageUri: string;
  size?: number;
  withBorder?: boolean;
  style?: object;
  userId: string;
}

export const UserAvatar = ({ imageUri, size, withBorder, style, userId }: Props) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("UserProfile", {userId: userId});
      }}
    >
      <Avatar
        imageUri={imageUri}
        size={size}
        withBorder={withBorder}
        style={style}
      />
      <UserBadge />
    </TouchableOpacity>
  );
};
