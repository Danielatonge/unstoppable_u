import { View, Text, Button, TextInput } from "react-native";
import React, { useState } from "react";
import styled from "styled-components";
import { Avatar } from "../../components/Avatar";
import { SCREEN_PADDING } from "../../theme";
import { SimpleButton } from "../../components/Button/SimpleButton";
import { BUTTON_WIDTH } from "../../constants";
import { useNavigation, useTheme } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { USER } from "../../mock";
import { AppLoader } from "../../AppLoader";

const Container = styled.ScrollView`
  background-color: #fff;
  padding: 20px ${SCREEN_PADDING}px
  flex: 1;
`;
const AvatarImage = styled(Avatar)`
  align-items: center;
  justify-content: center;
`;
const InputGroup = styled.View`
  margin-vertical: 8px;
  width: 70%;
`;
const TextInputField = styled.TextInput`
  border-radius: 4px;
  background: ${({ theme }) => theme.background};
  padding: 10px;
  width: ${BUTTON_WIDTH}px;
  font-size: 14px;
`;
const LabelText = styled.Text`
  font-weight: 600;
  font-size: 14px;
  margin: 5px 0;
  color: ${({ theme }) => theme.text};
`;

const ResetArea = styled.TouchableOpacity``;
const ResetText = styled.Text``;
const MainText = styled.Text`
  font-size: 20px;
  font-weight: 600;
`;
const AboutText = styled.Text`
text-align: center;
margin-vertical: 10px;
line-height: 22px
font-size: 14px 
`;

export const Login = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  return (
    <Container contentContainerStyle={{ alignItems: "center" }}>
      <AppLoader />

      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: "70%",
          height: 150,
        }}
      >
        <MainText>Hello there!</MainText>
        <AboutText>
          Log in or create an account to show the world how awesome you are.{" "}
        </AboutText>
      </View>
      <SimpleButton
        style={{ marginTop: 15, marginBottom: 10, width: "70%" }}
        onPress={() => navigation.navigate("AccountCreation")}
        fill={false}
        title={"Create an account"}
      />
      <SimpleButton
        style={{ marginVertical: 20, width: "71%" }}
        onPress={() => navigation.navigate("SignIn")}
        title="Sign in"
        fill={true}
      />
    </Container>
  );
};
