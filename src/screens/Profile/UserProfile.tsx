import { View, Text, useColorScheme } from "react-native";
import React from "react";
import { ProfileHeader } from "../../components/Profile/ProfileHeader";
import styled from "styled-components";
import { Avatar } from "../../components/Avatar";
import { USER } from "../../mock";
import { Icon } from "../../components/Icon";
import { getColorScheme } from "../../helpers";
import { UserTabView } from "../../components/Profile/UserTabView";
import { useNavigation } from "@react-navigation/native";

const Container = styled.View`
  padding: 0 10px;
`;

const UserRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
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

export const UserProfile = () => {
  const scheme = useColorScheme();
  const { theme } = getColorScheme("AUTOMATIC", scheme);
  const colors = theme.colors;
  const navigation = useNavigation();

  return (
    <>
      <ProfileHeader
        profileMotivation="What's stopping you?"
        backAction={() => {}}
      ></ProfileHeader>

      <Container>
        <Avatar
          imageUri={USER.imageUri}
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
          <NewPostButton onPress={() => navigation.navigate("ComposePost")}>
            <NewPostText>New post</NewPostText>
          </NewPostButton>
        </UserRow>
        <SectionBio>
          <UserText>John Paul</UserText>
          <HandleText>@johnpaul</HandleText>
          <DescriptionText>
            Aspiring developer - Web & Mobile UI/UX development; Graphics;
            Illustrations
          </DescriptionText>
          <JoinedDate>
            <Icon
              name="Link"
              color={colors.text}
              size={20}
              style={{ alignSelf: "center", marginRight: 5 }}
            />
            <IconLabel>johnpaul.ru</IconLabel>
            <Icon
              name="Calendar"
              color={colors.text}
              size={20}
              style={{ alignSelf: "center", marginRight: 3 }}
            />
            <IconLabel>Joined September 2018</IconLabel>
          </JoinedDate>
          <Statistics>
            <ConnectText>217 Mentors 118 Mentoring</ConnectText>
          </Statistics>
        </SectionBio>
      </Container>
      <UserTabView />
    </>
  );
};
