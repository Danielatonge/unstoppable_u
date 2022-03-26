import {
  View,
  Text,
  Button,
  TextInput,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Avatar } from "../../components/Avatar";
import { SCREEN_PADDING } from "../../theme";
import { SimpleButton } from "../../components/Button/SimpleButton";
import { BUTTON_WIDTH } from "../../constants";
import { useNavigation, useTheme } from "@react-navigation/native";
import { AppLoader } from "../../AppLoader";
import * as AuthSession from "expo-auth-session";
import jwtDecode from "jwt-decode";
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import { FIND_USER_GIVEN_ID } from "../../operations/queries/user";
import { CREATE_USER } from "../../operations/mutations/user";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  text-align: center;
`;
const AboutText = styled.Text`
text-align: center;
margin-vertical: 10px;
line-height: 22px
font-size: 14px 
`;

const auth0ClientId = "EPl6iHuWpBFfq66tGC5R6QHQTRiFlMJ8";
const auth0Domain = "dev-7so-sx2z.us.auth0.com";
const authorizationEndpoint = `https://${auth0Domain}/authorize`;

export const Login = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  const [getUserGivenId, { data: fetchedUsers }] =
    useLazyQuery(FIND_USER_GIVEN_ID);

  const [createUserMutation, { data: createdUserData }] =
    useMutation(CREATE_USER);

  const [authToken, setAuthToken] = useState("");

  const printAsyncStorageValues = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const result = await AsyncStorage.multiGet(keys);

      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const readCachedUser = async () => {
      // printAsyncStorageValues();
      //get cached jwt token
      try {
        const value = await AsyncStorage.getItem("@USER_AUTH_TOKEN");
        if (value !== null) {
          setAuthToken(value);
          navigation.navigate("Main");
        }
      } catch (e) {
        console.log("Custom Error(Not found user auth token): ", e);
      }
    };
    readCachedUser();
  }, []);

  return (
    <Container
      contentContainerStyle={{
        alignItems: "center",
        justifyContent: "center",
        height: 600,
      }}
    >
      <AppLoader />
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: "70%",
          height: 150,
        }}
      >
        <MainText>Welcome to the Unstoppable Universe!</MainText>
        <AboutText>
          Sign in or create an account to show the world how awesome you are.{" "}
        </AboutText>
      </View>

      <SimpleButton
        style={{ marginVertical: 20, width: "71%" }}
        title="Sign in or Create an Account"
        onPress={() => navigation.navigate("Main")}
        fill={true}
      />
    </Container>
  );
};
