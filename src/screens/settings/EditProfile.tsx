import { View, Text, Button, TextInput } from "react-native";
import React, { useState } from "react";
import styled from "styled-components";
import { Avatar } from "../../components/Avatar";
import { SCREEN_PADDING } from "../../theme";
import { SimpleButton } from "../../components/Button/SimpleButton";
import { BUTTON_WIDTH } from "../../constants";
import { useTheme } from "@react-navigation/native";
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

const ResetArea = styled.TouchableOpacity``;
const ResetText = styled.Text``;

export const EditProfile = () => {
  const user = USER;

  const [username, setUsername] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [image, setImage] = useState(user.imageUri);
  const { colors } = useTheme();

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log("Result: ", result);

    if (!result.cancelled) {
      setImage(result.uri);
    } else {
      setImage(null);
    }
  };

  return (
    <Container contentContainerStyle={{ alignItems: "center" }}>
      <AvatarImage
        imageUri={image}
        size={100}
        style={{ backgroundColor: "#eee" }}
      />
      <SimpleButton
        style={{ marginTop: 15, marginBottom: 10, width: 150 }}
        onPress={pickImage}
        fill={false}
        title={"Edit Picture"}
      />
      <InputGroup>
        <LabelText>Username:</LabelText>
        <TextInputField
          placeholder="Enter your username"
          value={username}
          maxLength={20}
          autoCapitalize={"none"}
          onChangeText={setUsername}
          style={{ color: colors.text }}
        />
      </InputGroup>
      <InputGroup>
        <LabelText>Email:</LabelText>
        <TextInputField
          placeholder="Enter your email"
          value={email}
          maxLength={30}
          autoCapitalize={"none"}
          onChangeText={setEmail}
          style={{ color: colors.text }}
        />
      </InputGroup>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "70%",
        }}
      >
        <View></View>
        <ResetArea>
          <ResetText>Reset your password</ResetText>
        </ResetArea>
      </View>
      <SimpleButton
        style={{ marginVertical: 20, width: "70%" }}
        onPress={() => {}}
        title="Save Changes"
        fill={true}
      />
    </Container>
  );
};
