import {
  View,
  Pressable,
  Text,
  useColorScheme,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { getColorScheme } from "../../helpers";
import styled from "styled-components";
import { SCREEN_PADDING } from "../../theme";
import { Avatar } from "../Avatar";
import { Icon } from "../Icon";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";

const PostContainer = styled.Pressable<{ profile: boolean }>`
  padding: ${SCREEN_PADDING}px;
  background: ${({ theme }) => theme.secondary};
  flex-direction: row;
  width: 100%;
  border-bottom-width: 1px;
  border-color: #ccc;
  align-items: center;
  height: 100px;
`;
const RightContainer = styled.View`
  flex: 1;
  padding-left: 10px;
  position: relative;
`;

const ContentContainer = styled.View`
  margin-vertical: 4px;
`;
const ActionContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
const DescriptionText = styled.Text`
  color: ${({ theme }) => theme.text};
  line-height: 18px;
`;

const IconContainer = styled.TouchableOpacity`
  flex-direction: row;
  margin-right: 30px;
`;

const IconLabel = styled.Text`
  color: ${({ theme }) => theme.text};
  align-self: center;
  margin-left: 4px;
`;

const UserText = styled.Text`
  color: ${({ theme }) => theme.text};
  margin-right: 5px;
  font-weight: 800;
`;

const HandleText = styled.Text`
  color: ${({ theme }) => theme.text};
`;
const TimeText = styled.Text`
  color: ${({ theme }) => theme.text};
`;

const HeaderRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const HeaderInfo = styled.Pressable`
  flex-direction: row;
  justify-content: space-between;
`;

const PathFill = styled.View`
  position: absolute;
  height: 100%;
  background-color: grey;
  width: 1px;
  left: -30px;
  top: 70px;
`;

interface Props {
  id: string;
  name: string;
  username: string;
  avatar?: string;
  message?: string;
  lastTimeStamp: string;
}

export const MessengerCard = ({
  id,
  name,
  username,
  avatar,
  message,
  lastTimeStamp,
}: Props) => {
  const scheme = useColorScheme();
  const { theme } = getColorScheme("AUTOMATIC", scheme);
  const colors = theme.colors;
  const navigation = useNavigation();

  return (
    <PostContainer onPress={() => navigation.navigate("Chat")}>
      <View>
        <Avatar imageUri={avatar} size={50}></Avatar>
      </View>
      <RightContainer>
        <HeaderRow>
          <HeaderInfo>
            <View style={{ flexDirection: "row", alignSelf: "center" }}>
              <UserText>{name}</UserText>
              <HandleText>@{username}</HandleText>
            </View>
          </HeaderInfo>
          <TimeText>{moment(lastTimeStamp).format("DD/MM/YY")}</TimeText>
        </HeaderRow>
        <ContentContainer>
          <DescriptionText>{message}</DescriptionText>
        </ContentContainer>
      </RightContainer>
    </PostContainer>
  );
};
