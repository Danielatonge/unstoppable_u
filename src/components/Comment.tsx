import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { PostItem } from "./Home/PostItem";
import { COMMENTS, POSTS } from "../mock";
import styled from "styled-components";
import { Avatar } from "./Avatar";
import moment from "moment";
import { Icon } from "./Icon";
import { useNavigation, useTheme } from "@react-navigation/native";
import { useMutation } from "@apollo/client";
import { SET_LIKEDUSER_COMMENT } from "../operations/mutations/comment";

const PostContainer = styled.Pressable<{ profile: boolean }>`
  background: ${({ theme }) => theme.secondary};
  flex-direction: row;
  padding: 10px;
  width: 100%;
  border-bottom-width: ${({ profile }) => (profile ? 0 : 1)}px;
  border-color: #ccc;
`;
const RightContainer = styled.View`
  flex: 1;
  padding-left: 20px;
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
  padding-bottom: 10px;
`;

const IconLabel = styled.Text`
  color: ${({ theme }) => theme.text};
  align-self: center;
  margin-left: 4px;
`;

const HeaderItem = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex: 1;
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
  flex-direction: column;
  flex: 1;
`;

const CareerText = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.text};
`;

export const Comment = ({
  id,
  userUri,
  username,
  userhandle,
  currentPosition,
  createdAt,
  content,
  likedUsers,
  alreadyLiked,
  userId,
}) => {
  const navigation = useNavigation();
  const colors = useTheme().colors;

  const likeCountInit = likedUsers?.length || 0;
  const [likeCount, setLikeCount] = useState(likeCountInit);

  const [localLiked, setLocalLiked] = useState(alreadyLiked);

  const [setLikedUserComment, { error, data }] = useMutation(
    SET_LIKEDUSER_COMMENT
  );

  // database data alittle bit raw that's why alot of checks
  const onToggleLikeComment = () => {
    setLocalLiked(!localLiked);
    if (!localLiked) {
      setLikeCount(likeCount + 1);
      setLikedUserComment({
        variables: { commentId: id, userIds: [...(likedUsers || []), userId] },
      });
    } else {
      setLikeCount(likeCount - 1);
      const userIds = likedUsers?.filter((id) => id !== userId);
      setLikedUserComment({
        variables: { commentId: id, userIds: userIds || [] },
      });
    }
  };

  return (
    <PostContainer>
      <View
        style={{
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TouchableOpacity style={{ marginTop: 5 }}>
          <Avatar imageUri={userUri} size={60}></Avatar>
        </TouchableOpacity>
        <IconContainer onPress={() => onToggleLikeComment()}>
          <Icon
            name={localLiked ? "HeartFull" : "Heart"}
            size={24}
            color={localLiked ? "#ED6A5A" : colors.text}
          />
          <IconLabel>{likeCount}</IconLabel>
        </IconContainer>
      </View>
      <RightContainer>
        <HeaderRow>
          <HeaderItem>
            <TouchableOpacity
              style={{ flexDirection: "row" }}
              onPress={() => {
                navigation.goBack();
                navigation.navigate("UserProfile");
              }}
            >
              <UserText>{username}</UserText>
              <HandleText>@{userhandle}</HandleText>
              <Icon name="Dot" size={18} color="grey" />
              <TimeText>{moment(createdAt).fromNow()} </TimeText>
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon name="Dots" color={colors.text}></Icon>
            </TouchableOpacity>
          </HeaderItem>
          <HeaderItem>
            <CareerText>{currentPosition}</CareerText>
          </HeaderItem>
        </HeaderRow>
        <ContentContainer>
          <DescriptionText>{content}</DescriptionText>
        </ContentContainer>
        <ActionContainer>
          <View style={{ flexDirection: "row" }}></View>
        </ActionContainer>
      </RightContainer>
    </PostContainer>
  );
};
