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
}

export const UserAvatar = ({ imageUri, size, withBorder, style }: Props) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("UserProfile");
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
