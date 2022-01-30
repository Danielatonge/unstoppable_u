import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  useColorScheme,
  ImageBackground,
} from "react-native";
import React from "react";
import { Avatar } from "./Avatar";
import { Icon } from "./Icon";
import { SCREEN_PADDING } from "../theme";
import styled from "styled-components";
import { abbreviateNumber, getColorScheme } from "../helpers";
import { MENTOR_BG } from "../constants";

const PostContainer = styled.Pressable`
  height: 260px;
  background: ${({ theme }) => theme.secondary};
  width: 100%;
  border-top-end-radius: 10px;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  margin-bottom: 5px;
`;

const InfoContainer = styled.View`
  flex-direction: row;
  height: 215px;
  padding-right: 10px;
`;

const LeftContainer = styled.View`
  width: 40%;
  padding-left: 10px;
  position: relative;
`;

const RightContainer = styled.View`
  width: 60%;
  padding-left: 10px;
  position: relative;
`;

const ContentContainer = styled.View`
  margin-vertical: 6px;
`;

const IconContainer = styled.TouchableOpacity`
  flex-direction: row;
`;
const ActionContainer = styled.View`
  padding: 15px;
  height: 45px;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  background: ${({ theme }) => theme.secondary};
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;
const DescriptionText = styled.Text`
  color: ${({ theme }) => "white" || theme.text};
  font-size: 40px;
  font-weight: 900;
  line-height: 50px;
`;
const TagView = styled.View`
  padding-left: 2px;
  margin-vertical: 10px;
`;

const TagText = styled.Text`
  color: ${({ theme }) => theme.text};
`;
const IconLabel = styled.Text`
  color: ${({ theme }) => theme.text};
  align-self: center;
  margin-left: 4px;
`;

const UserText = styled.Text`
  color: ${({ theme }) => theme.text};
  margin-right: 5px;
  font-weight: 600;
  font-size: 16px;
`;

const HandleText = styled.Text`
  color: ${({ theme }) => theme.text};
`;
const TimeText = styled.Text`
  color: ${({ theme }) => theme.text};
`;

const HeaderInfo = styled.Pressable`
  flex-direction: row;
  margin-vertical: 10px;
`;

interface MentorProps {
  id: string;
  avatar: string;
  userName: string;
  userHandle: string;
  achievement: string;
  likeCount: number;
  followCount: number;
  tags: string;
}

export const MentorCard = ({
  id,
  avatar,
  userName,
  userHandle,
  achievement,
  likeCount,
  followCount,
  tags,
}: MentorProps) => {
  const scheme = useColorScheme();
  const { theme } = getColorScheme("AUTOMATIC", scheme);
  const colors = theme.colors;
  const randomIndex = Math.floor(Math.random() * 3);

  return (
    <PostContainer>
      <ImageBackground
        source={{ uri: MENTOR_BG[randomIndex] }}
        style={{ justifyContent: "center" }}
        resizeMode="cover"
      >
        <InfoContainer>
          <LeftContainer>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Avatar imageUri={avatar} size={80}></Avatar>
            </View>
          </LeftContainer>
          <RightContainer>
            <HeaderInfo>
              <TouchableOpacity
                style={{ flexDirection: "row", alignSelf: "center" }}
              >
                <UserText>{userName}</UserText>
                <HandleText>@{userHandle}</HandleText>
              </TouchableOpacity>
            </HeaderInfo>

            <ContentContainer>
              <DescriptionText>{achievement}</DescriptionText>
            </ContentContainer>

            <TagView>
              <TagText>{tags}</TagText>
            </TagView>
          </RightContainer>
        </InfoContainer>
        <ActionContainer>
          <IconContainer>
            <Icon name="Heart" size={24} color={colors.text} />
            <IconLabel>{abbreviateNumber(likeCount)}</IconLabel>
          </IconContainer>

          <IconContainer>
            <Icon name="Follow" size={24} color={colors.text} />
            <IconLabel>{abbreviateNumber(followCount)}</IconLabel>
          </IconContainer>
        </ActionContainer>
      </ImageBackground>
    </PostContainer>
  );
};
