import { View, Text } from "react-native";
import React from "react";
import { Badge } from "react-native-elements";

export const BottomTabBadge = () => (
  <Badge
    status="error"
    badgeStyle={{
      borderRadius: 10,
      height: 10,
      minWidth: 0,
      width: 10,
      borderWidth: 2,
      borderColor: "white",
    }}
    containerStyle={{
      position: "absolute",
      top: -2,
      left: 49,
      zIndex: 2,
      elevation: 2,
    }}
  />
);
