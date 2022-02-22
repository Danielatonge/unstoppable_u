import {
  View,
  Text,
  Image,
  TouchableOpacity,
  useColorScheme,
  ActivityIndicator,
  FlatList,
} from "react-native";
import React, { useEffect, useReducer, useState } from "react";
import { POSTS } from "../mock";
import styled from "styled-components";
import { SCREEN_PADDING } from "../theme";
import { Avatar } from "../components/Avatar";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "../components/Icon";
import moment from "moment";
import { getColorScheme } from "../helpers";
import { PostItem } from "../components/Home/PostItem";
import { gql, useMutation, useQuery } from "@apollo/client";
import { GET_POST_GIVEN_ID } from "../operations/queries/post";
import { SET_LIKEDUSER_POST } from "../operations/mutations/post";
import { CommentItem } from "./Comments";
import { GET_COMMENTS } from "../operations/queries/comment";

const Wrapper = styled.View<{ profile: boolean }>`
  background: ${({ theme }) => theme.secondary};
  border-bottom-width: 1px;
  border-color: #ccc;
`;
const PostContainer = styled.View`
  padding: ${SCREEN_PADDING}px;
  padding-bottom: 0px;
  border-bottom-width: 1px;
  border-color: #ccc;
`;

const Row = styled.View`
  flex-direction: row;
`;

const HeaderRow = styled.View`
  flex-direction: column;
  flex: 1;
`;

const HeaderItem = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  margin-left: 10px;
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
const CareerText = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.text};
`;
const TimeText = styled.Text`
  color: ${({ theme }) => theme.text};
`;

const MediaImage = styled.Image`
  width: 300px;
  height: 200px;
  border-radius: 10px;
`;

const CaptionContainer = styled.View`
  margin-vertical: 4px;
`;

const DetailContainer = styled.View`
  margin-vertical: 4px;
`;

const MediaContainer = styled.View`
  margin-vertical: 4px;
`;

const ActionContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-vertical: 10px;
`;

const CaptionText = styled.Text`
  color: ${({ theme }) => theme.text};
  line-height: 18px;
  font-size: 14px;
  font-weight: 500;
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

const CommentContainer = styled.View`
  padding-left: 0px;
`;

const GET_POST = gql`
  {
    posts(where: { id: "1" }) {
      id
      content
    }
  }
`;

export const ViewPost = ({ route }) => {
  const { postId, userId } = route.params;

  const navigation = useNavigation();
  const { data: postData, loading: loadingPost } = useQuery(GET_POST_GIVEN_ID, {
    variables: { postId: postId },
    fetchPolicy: "network-only",
  });

  const {
    data: commentsData,
    loading: loadingComments,
    fetchMore: fetchMoreComments,
  } = useQuery(GET_COMMENTS, {
    variables: { postId: postId },
    fetchPolicy: "cache-first",
  });

  // console.log({ postId, userId, postData });
  const id = postData?.posts[0].id;
  const avatar = postData?.posts[0].user?.userImage;
  const userName = postData?.posts[0].user?.fullName;
  const userHandle = postData?.posts[0].user?.userName;
  const userCurrentPosition = postData?.posts[0].user?.currentPosition;
  const caption = postData?.posts[0].content;
  const detailed = postData?.posts[0].extraContent;
  const postImage = postData?.posts[0]?.image;
  const likedUsers = postData?.posts[0].likedUsers;
  const commentCount = postData?.posts[0].commentCount;
  const timestamp = postData?.posts[0].createdAt;
  const bookmark = false;

  const likeCountInit = likedUsers?.length || 0;
  const alreadyLiked = likedUsers ? likedUsers?.includes(userId) : false;
  const [localLiked, setLocalLiked] = useState(alreadyLiked);
  const [_, forceUpdate] = useReducer((x) => x + 1, 0);
  const [likeCount, setLikeCount] = useState(likeCountInit);

  const [setLikedUserPost, { error, data }] = useMutation(SET_LIKEDUSER_POST);

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

  const scheme = useColorScheme();
  const { theme } = getColorScheme("AUTOMATIC", scheme);
  const colors = theme.colors;

  const comments = POSTS;

  const [newPost, setNewPost] = useState([]);

  useEffect(() => {
    console.log(newPost);
  }, [newPost]);

  if (loadingPost || loadingComments) {
    <ActivityIndicator></ActivityIndicator>;
  }

  return (
    <>
      <PostContainer>
        <Row>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Avatar imageUri={avatar} size={60}></Avatar>
          </View>
          <HeaderRow>
            <HeaderItem>
              <TouchableOpacity
                style={{ flexDirection: "row" }}
                onPress={() => navigation.navigate("UserProfile")}
              >
                <UserText>{userName}</UserText>
                <HandleText>@{userHandle}</HandleText>
                <Icon name="Dot" size={18} color="grey" />
                <TimeText>{moment(timestamp).fromNow()}</TimeText>
              </TouchableOpacity>
              <TouchableOpacity>
                <Icon name="Dots" color={colors.text}></Icon>
              </TouchableOpacity>
            </HeaderItem>
            <HeaderItem>
              <CareerText>{userCurrentPosition}</CareerText>
            </HeaderItem>
          </HeaderRow>
        </Row>

        <CaptionContainer>
          <CaptionText>{caption}</CaptionText>
        </CaptionContainer>
        <DetailContainer>
          <DescriptionText>{detailed}</DescriptionText>
        </DetailContainer>

        {postImage ? (
          <MediaContainer>
            <MediaImage
              source={{ uri: postImage }}
              style={{ width: 300, height: 200 }}
            />
          </MediaContainer>
        ) : (
          <View></View>
        )}

        <ActionContainer>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Text
              style={{ color: colors.text, fontSize: 14, fontWeight: "500" }}
            >
              Comments
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <IconContainer onPress={() => onToggleLikePost()}>
              <Icon
                name={localLiked ? "HeartFull" : "Heart"}
                size={24}
                color={localLiked ? "#ED6A5A" : colors.text}
              />
              <IconLabel>{likeCount}</IconLabel>
            </IconContainer>
            <IconContainer disabled>
              <Icon name="Bubble" size={24} color={colors.text} />
              <IconLabel>{commentCount}</IconLabel>
            </IconContainer>

            {bookmark ? (
              <TouchableOpacity>
                <Icon name="Bookmarkminus" size={24} color={colors.text} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity>
                <Icon name="Bookmarkplus" size={24} color={colors.text} />
              </TouchableOpacity>
            )}
          </View>
        </ActionContainer>
      </PostContainer>
      <FlatList
        data={commentsData?.posts[0].comments}
        renderItem={({ item }) => (
          <CommentItem comment={item} userId={userId} />
        )}
        keyExtractor={(item) => {
          return item.id;
        }}
        refreshing={loadingComments}
        onRefresh={() => forceUpdate()}
        onEndReached={() =>
          fetchMoreComments({
            variables: {
              postId,
              offset: commentsData?.posts[0].comments.length,
            },
          })
        }
      />
    </>
  );
};
