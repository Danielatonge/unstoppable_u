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

const useProxy = Platform.select({ web: false, default: true });
const redirectUri = AuthSession.makeRedirectUri({ useProxy });

export const Login = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  const [getUserGivenId, { data: fetchedUsers }] =
    useLazyQuery(FIND_USER_GIVEN_ID);

  const [createUserMutation, { data: createdUserData }] =
    useMutation(CREATE_USER);

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
          navigation.navigate("Main");
        }
      } catch (e) {
        console.log("Custom Error(Not found user auth token): ", e);
      }
    };
    readCachedUser();
  }, []);

  const [request, result, promptAsync] = AuthSession.useAuthRequest(
    {
      redirectUri,
      clientId: auth0ClientId,
      responseType: "id_token",
      scopes: ["openid", "profile"],
      extraParams: {
        nonce: "nonce",
      },
    },
    { authorizationEndpoint }
  );

  useEffect(() => {
    const authenticateUser = async () => {
      if (result) {
        if (result.error) {
          Alert.alert(
            "Authentication error",
            result.params.error_description || "something went wrong"
          );
          return;
        }
        if (result.type === "success") {
          // Retrieve the JWT token and decode it
          const jwtToken = result.params.id_token;
          const decoded = jwtDecode(jwtToken);
          const userTempObject = {
            aud: decoded?.aud,
            exp: decoded?.exp,
            family_name: decoded?.family_name,
            given_name: decoded?.given_name,
            iat: decoded?.iat,
            iss: decoded?.iss,
            locale: decoded?.locale,
            name: decoded?.name,
            nickname: decoded?.nickname,
            nonce: decoded?.nonce,
            picture: decoded?.picture,
            sub: decoded?.sub,
            updated_at: decoded?.updated_at,
            token: jwtToken,
          };
          await AsyncStorage.setItem("@USER_AUTH_TOKEN", jwtToken);
          // await AsyncStorage.setItem("@USER_AUTH_TOKEN", jwtToken);
          await getUserGivenId({ variables: { id: decoded?.sub } });

          // if user exist set persisted user data and redirect to Main
          // if user doesn't exist, create new user record, persist user data and redirect to Main

          if (fetchedUsers && fetchedUsers?.users.length === 0) {
            const userInCreation = {
              id: decoded?.sub,
              fullName: decoded?.name,
              userName: decoded?.nickname,
              userImage: decoded?.picture,
            };
            createUserMutation({ variables: { input: [userInCreation] } });
          } else if (fetchedUsers && fetchedUsers?.users.length !== 0) {
            console.log("User Exist", fetchedUsers?.users[0]);
            const decoded = fetchedUsers?.users[0];
          }

          console.log(decoded);

          navigation.navigate("Main");
        }
      }
    };
    authenticateUser();
  }, [result]);

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
      {result && result.type === "success" ? (
        <View style={{ height: 60 }}>
          <ActivityIndicator />
        </View>
      ) : (
        <SimpleButton
          style={{ marginVertical: 20, width: "71%" }}
          title="Sign in or Create an Account"
          onPress={() => promptAsync({ useProxy })}
          fill={true}
        />
      )}
    </Container>
  );
};
