import { View, Text } from "react-native";
import React from "react";

export const SettingsMenu = ({ items }) => {
  return (
    <View>
      {items.map((item) => (
        <View key={item.title}>
          <Text>{item.title}</Text>
        </View>
      ))}
    </View>
  );
};
