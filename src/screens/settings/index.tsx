import { View, Text, Linking, Alert } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components";
import { SettingsMenu } from "./SettingsMenu";

export const Settings = () => {
  const navigation = useNavigation();

  const items = [
    {
      title: "Account",
      thumbIcon: "Account",
      thumbColor: "#4db3ff",
      action: () => navigation.navigate("EditProfile"),
    },
    {
      title: "About",
      thumbIcon: "Infos",
      thumbColor: "#35ce8d",
      action: () => navigation.navigate("About"),
    },
    {
      title: "Contact us",
      thumbIcon: "Pencil",
      thumbColor: "#ed6a5a",
      action: () => {
        Alert.alert(
          "Contact",
          "Whether you have a feature request, a bug report, or just a hi, you can contact us by sending an email.",
          [
            {
              text: "Send an email",
              onPress: () => {
                Linking.openURL("mailto:elamboatonge@gmail.com");
              },
              style: "default",
            },
            {
              text: "Cancel",
              style: "cancel",
            },
          ]
        );
      },
    },
    {
      title: "Log in / Sign up",
      thumbIcon: "Logout",
      thumbColor: "#35ce8d",
      action: () => navigation.navigate("SignIn"),
    },
  ];

  return (
    <Container>
      <SettingsMenu items={items}></SettingsMenu>
    </Container>
  );
};

const Container = styled.ScrollView``;
