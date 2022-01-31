import { View, Text } from "react-native";
import React from "react";
import { Badge } from "react-native-elements";

export const UserBadge = () => (
  <Badge
    status="success"
    badgeStyle={{
      borderRadius: 10,
      height: 10,
      minWidth: 0,
      width: 10,
      borderWidth: 2,
      borderColor: "white",
      zIndex: 10,
      elevation: 10,
    }}
    containerStyle={{ position: "absolute", top: -2, left: 25 }}
  />
);
