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

const MainText = styled.Text`
  font-size: 20px;
  font-weight: 600;
  text-align: center;
`;
const AboutText = styled.Text`
text-align: center;
margin-top: 10px;
line-height: 22px
font-size: 14px 
`;
const ErrorText = styled.Text`
  color: ${({ theme }) => theme.error};
  text-align: center;
  margin-top: 10px;
  font-size: 14px;
`;

const ResetArea = styled.TouchableOpacity``;
const ResetText = styled.Text``;

export const AccountPasswordCreation = ({ route }) => {
  const { colors } = useTheme();

  const navigation = useNavigation();

  const { username, email, image } = route.params;
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <Container contentContainerStyle={{ alignItems: "center" }}>
      <AvatarImage
        imageUri={image}
        size={100}
        style={{ backgroundColor: "#eee" }}
      />

      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: "70%",
          paddingVertical: 10,
        }}
      >
        <MainText>Welcome to the Unstoppable Universe!</MainText>
        <AboutText>
          Almost done! Create a secure password for your account.
        </AboutText>
      </View>

      <InputGroup>
        <LabelText>Password:</LabelText>
        <TextInputField
          placeholder="Enter password"
          value={password}
          autoCapitalize={"none"}
          onChangeText={setPassword}
          style={{ color: colors.text }}
          autocompleteType="username"
          secureTextEntry
        />
      </InputGroup>
      <InputGroup>
        <LabelText>Confirm password:</LabelText>
        <TextInputField
          value={passwordConfirmation}
          returnKeyType={"Done"}
          autoCapitalize={"none"}
          onChangeText={setPasswordConfirmation}
          style={{ color: colors.text }}
          autocompleteType="email"
          keyboardType="email-address"
          secureTextEntry
        />
      </InputGroup>
      <SimpleButton
        style={{ marginVertical: 20, width: "70%" }}
        onPress={() => navigation.navigate("Feed")}
        title="Create account"
        fill={true}
        disabled={password !== passwordConfirmation || password.length === 0}
      />
      <ErrorText> {error}</ErrorText>
    </Container>
  );
};
