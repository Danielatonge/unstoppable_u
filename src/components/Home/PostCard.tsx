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
import {
  REMOVE_BOOKMARK_POST,
  SET_BOOKMARK_POST,
  SET_LIKEDUSER_POST,
} from "../../operations/mutations/post";
import { useMutation } from "@apollo/client";
import { GET_BOOKMARKED_POSTS_GIVEN_USERID } from "../../operations/queries/post";

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
  likedUsers: string[];
  commentCount: number;
  timestamp: string;
  alreadyLiked: boolean;
  alreadyBookmarked: boolean;
  profile?: boolean;
  bookmark?: boolean;
  comment?: boolean;
  userId: string;
  postUserId: string;
}

export const PostCard = ({
  id,
  avatar,
  userName,
  userHandle,
  desc,
  likedUsers,
  commentCount,
  timestamp,
  alreadyLiked,
  alreadyBookmarked,
  profile,
  bookmark,
  comment,
  userId,
  postUserId,
}: PostProps) => {
  const scheme = useColorScheme();
  const { theme } = getColorScheme("AUTOMATIC", scheme);
  const colors = theme.colors;
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const likeCountInit = likedUsers?.length || 0;
  const [likeCount, setLikeCount] = useState(likeCountInit);
  const [localLiked, setLocalLiked] = useState(alreadyLiked);

  const [setLikedUserPost, { error: error1, data: data1 }] =
    useMutation(SET_LIKEDUSER_POST);
  const [setBookmarkPost, { error: error2, data: data2 }] =
    useMutation(SET_BOOKMARK_POST);
  const [removeBookmarkPost, { error: error3, data: data3 }] = useMutation(
    REMOVE_BOOKMARK_POST,
    {
      refetchQueries: [GET_BOOKMARKED_POSTS_GIVEN_USERID],
    }
  );

  // database data alittle bit raw that's why alot of checks
  const onToggleLikePost = () => {
    setLocalLiked(!localLiked);
    if (!localLiked) {
      setLikeCount(likeCount + 1);
      setLikedUserPost({
        variables: { postId: id, userIds: [...(likedUsers || []), userId] },
      });
    } else {
      setLikeCount(likeCount - 1);
      const userIds = likedUsers?.filter((id) => id !== userId);
      setLikedUserPost({
        variables: { postId: id, userIds: userIds || [] },
      });
    }
  };
  const [localBookmarked, setLocalBookmarked] = useState(alreadyBookmarked);
  const onToggleBookmarkPost = () => {
    setLocalBookmarked(!localBookmarked);
    if (!localBookmarked) {
      setBookmarkPost({
        variables: {
          postId: id,
          userId: userId,
        },
      });
    } else {
      removeBookmarkPost({
        variables: {
          postId: id,
          userId: userId,
        },
      });
    }
  };

  const Comment = comment ? (
    <View></View>
  ) : (
    <TouchableOpacity onPress={() => onToggleBookmarkPost()}>
      <Icon
        name={localBookmarked ? "Bookmarkminus" : "Bookmarkplus"}
        size={24}
        color={colors.text}
      />
    </TouchableOpacity>
  );

  return (
    <PostContainer
      profile={profile}
      onPress={() => navigation.navigate("ViewPost", { postId: id, userId })}
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
              onPress={() =>
                navigation.navigate("UserProfile", { userId: postUserId })
              }
            >
              <UserText>{userName}</UserText>
              {/* <HandleText>@{userHandle}</HandleText> */}
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
          <DescriptionText>
            {desc &&
              (desc.length >= 200 ? desc.slice(0, 200).concat("...") : desc)}
          </DescriptionText>
        </ContentContainer>
        <ActionContainer>
          <View style={{ flexDirection: "row" }}>
            <IconContainer onPress={() => onToggleLikePost()}>
              <Icon
                name={localLiked ? "HeartFull" : "Heart"}
                size={24}
                color={localLiked ? "#ED6A5A" : colors.text}
              />
              <IconLabel>{likeCount}</IconLabel>
            </IconContainer>
            <IconContainer
              onPress={() =>
                navigation.navigate("Comment", { postId: id, userId })
              }
            >
              <Icon name="Bubble" size={24} color={colors.text} />
              <IconLabel>{commentCount || 0}</IconLabel>
            </IconContainer>
          </View>
          {Comment}
        </ActionContainer>
      </RightContainer>
    </PostContainer>
  );
};
