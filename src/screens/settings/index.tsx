import { View, Text, Linking, Alert } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components";
import { Icon } from "../../components/Icon";
import { useApolloClient } from "../../hooks/useApolloClient";

export const Settings = () => {
  const navigation = useNavigation();
  const { clearCache } = useApolloClient();
  const items = [
    [
      {
        title: "Account",
        thumbIcon: "Account",
        thumbColor: "#4db3ff",
        disabled: false,
        action: () => {
          navigation.navigate("EditProfile");
        },
      },
      {
        title: "Log out",
        thumbIcon: "Logout",
        thumbColor: "#35ce8d",
        action: () => {
          clearCache();
          navigation.navigate("CreationModal");
        },
      },
      {
        title: "Data Collectors",
        thumbIcon: "Connect",
        thumbColor: "#ed6a5a",
        action: () => {
          Alert.alert("Data Collectors", "Coming Soon.", [
            {
              text: "Cancel",
              style: "cancel",
            },
          ]);
        },
      },
    ],
    [
      {
        title: "About",
        thumbIcon: "Infos",
        thumbColor: "#4db3ff",
        action: () => {
          Alert.alert("About", "Coming Soon.", [
            {
              text: "Cancel",
              style: "cancel",
            },
          ]);
        },
      },
      {
        title: "Contact us",
        thumbIcon: "Pencil",
        thumbColor: "#35ce8d",
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
        title: "Tips",
        thumbIcon: "Star",
        thumbColor: "#ed6a5a",
        action: () => {
          Alert.alert("Tips", "Coming Soon.", [
            {
              text: "Cancel",
              style: "cancel",
            },
          ]);
        },
      },
    ],
  ];

  return (
    <Container>
      {items.map((item, index) => (
        <SectionContainer key={index}>
          {item.map((option, i) => (
            <Row
              key={option.title}
              onPress={option.action}
              disabled={option.disabled}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {option.thumbIcon && (
                  <ThumbContainer>
                    <Icon
                      name={option.thumbIcon}
                      size={20}
                      color={option.thumbColor}
                    />
                  </ThumbContainer>
                )}
                <ThumbText>{option.title}</ThumbText>
              </View>
            </Row>
          ))}
        </SectionContainer>
      ))}
    </Container>
  );
};

const Container = styled.ScrollView``;

const SectionContainer = styled.View`
  margin: 20px;
  background-color: white;
  border-radius: 16px;
  padding: 0px 10px;
`;

const Row = styled.Pressable`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 15px 10px;
  border-bottom-width: 1px;
  border-color: #eee;
`;
const ThumbContainer = styled.View`
  flex-direction: row;
`;
const ThumbText = styled.Text`
  margin-left: 15px;
`;
