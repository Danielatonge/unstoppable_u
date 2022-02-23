import { View, Text, useColorScheme, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import { ProfileHeader } from "../../components/Profile/ProfileHeader";
import styled from "styled-components";
import { Avatar } from "../../components/Avatar";
import { USER } from "../../mock";
import { Icon } from "../../components/Icon";
import { getColorScheme } from "../../helpers";
import { UserTabView } from "../../components/Profile/UserTabView";
import { useNavigation } from "@react-navigation/native";
import { FIND_COMPLETE_USER_GIVEN_ID } from "../../operations/queries/user";
import { useLazyQuery, useQuery } from "@apollo/client";
import moment from "moment";
import { useDecodedToken } from "../../hooks/useDecodedToken";

const Container = styled.View`
  padding: 0 10px;
`;

const UserRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  min-height: 40px;
`;

const NewPostButton = styled.TouchableOpacity`
  border-radius: 50px;
  border-width: 2px;
  width: 100px;
  height: 30px;
  margin-top: 15px;
  padding: 0px;
  align-items: center;
  justify-content: center;
  border-color: ${({ theme }) => theme.text};
`;

const NewPostText = styled.Text`
  color: ${({ theme }) => theme.text};
  font-weight: bold;
`;

const UserText = styled.Text`
  color: ${({ theme }) => theme.text};
  margin-right: 5px;
  font-size: 16px;
  font-weight: 800;
`;
const HandleText = styled.Text`
  color: ${({ theme }) => theme.text};
  font-weight: 600;
`;
const DescriptionText = styled.Text`
  color: ${({ theme }) => theme.text};
  line-height: 18px;
  margin-bottom: 6px;
`;

const SectionBio = styled.View`
  margin-vertical: 15px;
`;
const Statistics = styled.View`
  margin-top: 6px;
`;

const JoinedDate = styled.View`
  flex-direction: row;
`;
const IconLabel = styled.Text`
  margin-right: 10px;
  align-self: center;
  color: ${({ theme }) => theme.text};
`;

const ConnectText = styled.Text`
  color: ${({ theme }) => theme.text};
`;

export const UserProfile = ({ route }) => {
  const { userId } = route.params;
  const scheme = useColorScheme();
  const { theme } = getColorScheme("AUTOMATIC", scheme);
  const colors = theme.colors;
  const navigation = useNavigation();

  const decodedToken = useDecodedToken();
  const isLoggedInUserProfile = decodedToken?.sub === userId;

  const {
    data: fetchedUsers,
    error: errorFetchingUser,
    loading,
  } = useQuery(FIND_COMPLETE_USER_GIVEN_ID, {
    variables: { id: userId },
    fetchPolicy: "cache-first",
  });

  console.log({ fetchedUsers, userId });
  if (loading) {
    return <ActivityIndicator></ActivityIndicator>;
  }
  const user = fetchedUsers?.users[0];
  return (
    <>
      <ProfileHeader
        profileMotivation={"What's stopping you?"}
        backAction={() => {}}
      ></ProfileHeader>

      <Container>
        <Avatar
          imageUri={user?.userImage || USER.imageUri}
          size={70}
          style={{
            borderWidth: 3,
            borderColor: "#fff",
            position: "absolute",
            top: -20,
            left: 10,
            elevation: 3,
            zIndex: 3,
          }}
        />
        <UserRow>
          <View></View>
          {isLoggedInUserProfile ? (
            <NewPostButton onPress={() => navigation.navigate("ComposePost")}>
              <NewPostText>New post</NewPostText>
            </NewPostButton>
          ) : (
            <View></View>
          )}
        </UserRow>
        <SectionBio>
          <UserText>{user?.fullName || ""}</UserText>
          <HandleText>@{user?.userName || ""}</HandleText>
          <DescriptionText>{user?.goal || "Lifelong learner"}</DescriptionText>
          <JoinedDate>
            {user?.email ? (
              <>
                <Icon
                  name="Link"
                  color={colors.text}
                  size={20}
                  style={{ alignSelf: "center", marginRight: 5 }}
                />
                <IconLabel>{user?.email}</IconLabel>
              </>
            ) : (
              <View></View>
            )}

            {user?.createdAt ? (
              <>
                <Icon
                  name="Link"
                  color={colors.text}
                  size={20}
                  style={{ alignSelf: "center", marginRight: 5 }}
                />
                <IconLabel>
                  Joined {moment(user?.createdAt).fromNow()}
                </IconLabel>
              </>
            ) : (
              <View></View>
            )}
          </JoinedDate>
          <Statistics>
            <ConnectText>
              {217 + " Mentors"} {118 + " Mentoring"}
            </ConnectText>
          </Statistics>
        </SectionBio>
      </Container>
      <UserTabView
        userId={userId}
        isLoggedInUserProfile={isLoggedInUserProfile}
      />
    </>
  );
};
