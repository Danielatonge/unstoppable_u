import {
  View,
  Pressable,
  Text,
  useColorScheme,
  TouchableOpacity,
  Alert,
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
  border-bottom-width: ${({ profile }) => (profile ? 0 : 1)}px;
  border-color: #ccc;
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

interface PostProps {
  id: string;
  avatar: string;
  userName: string;
  userHandle: string;
  desc: string;
  likeCount: number;
  comments: string[];
  timestamp: string;
  profile?: boolean;
  bookmark?: boolean;
  comment?: boolean;
}

export const PostCard = ({
  id,
  avatar,
  userName,
  userHandle,
  desc,
  likeCount = 0,
  comments,
  timestamp,
  profile,
  bookmark,
  comment,
}: PostProps) => {
  const scheme = useColorScheme();
  const { theme } = getColorScheme("AUTOMATIC", scheme);
  const colors = theme.colors;
  const navigation = useNavigation();
  const [userInfo, setUserInfo] = useState();
  const [loading, setLoading] = useState(false);

  const [localLiked, setLocalLiked] = useState(false);
  const localLikesCount = likeCount + (localLiked ? 1 : 0);

  const Comment = comment ? (
    <View></View>
  ) : (
    <Bookmark bookmark={bookmark} colors={colors} />
  );

  return (
    <PostContainer
      profile={profile}
      onPress={() => navigation.navigate("ViewPost")}
    >
      <View>
        <Avatar imageUri={avatar} size={60}></Avatar>
      </View>
      <RightContainer>
        {profile ? <PathFill></PathFill> : <View></View>}
        <HeaderRow>
          <HeaderInfo>
            <TouchableOpacity
              style={{ flexDirection: "row", alignSelf: "center" }}
              onPress={() => navigation.navigate("UserProfile")}
            >
              <UserText>{userName}</UserText>
              <HandleText>@{userHandle}</HandleText>
              <Icon name="Dot" size={18} color="grey" />
              <TimeText>{moment(timestamp).fromNow()}</TimeText>
            </TouchableOpacity>
          </HeaderInfo>
          <TouchableOpacity
            onPress={() => {
              Alert.alert(
                "Flag Post",
                "Help us get rid of innapropriate content",
                [
                  {
                    text: "Report",
                    onPress: () => {},
                    style: "default",
                  },
                  {
                    text: "Cancel",
                    style: "cancel",
                  },
                ]
              );
            }}
          >
            <Icon name="Dots" color={colors.text}></Icon>
          </TouchableOpacity>
        </HeaderRow>
        <ContentContainer>
          <DescriptionText>{desc}</DescriptionText>
        </ContentContainer>
        <ActionContainer>
          <View style={{ flexDirection: "row" }}>
            <IconContainer>
              <Icon name="Heart" size={24} color={colors.text} />
              <IconLabel>{likeCount}</IconLabel>
            </IconContainer>
            <IconContainer onPress={() => navigation.navigate("Comment")}>
              <Icon name="Bubble" size={24} color={colors.text} />
              <IconLabel>{comments ? comments.length : 4}</IconLabel>
            </IconContainer>
          </View>
          {Comment}
        </ActionContainer>
      </RightContainer>
    </PostContainer>
  );
};

const Bookmark = ({ bookmark, colors }) =>
  bookmark ? (
    <TouchableOpacity>
      <Icon name="Bookmarkminus" size={24} color={colors.text} />
    </TouchableOpacity>
  ) : (
    <TouchableOpacity>
      <Icon name="Bookmarkplus" size={24} color={colors.text} />
    </TouchableOpacity>
  );
