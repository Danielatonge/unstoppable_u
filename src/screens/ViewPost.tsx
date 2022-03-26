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
import {
  REMOVE_BOOKMARK_POST,
  SET_BOOKMARK_POST,
  SET_LIKEDUSER_POST,
} from "../operations/mutations/post";
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
    fetchPolicy: "network-only",
  });

  // console.log({ postId, userId, postData });
  const [completePost, setCompletePost] = useState(null);
  const [likeCount, setLikeCount] = useState(0);
  const [localLiked, setLocalLiked] = useState(false);
  const [localBookmarked, setLocalBookmarked] = useState(false);
  useEffect(() => {
    setCompletePost({
      id: postData?.posts[0].id,
      avatar: postData?.posts[0].user?.userImage,
      postUserId: postData?.posts[0].user?.id,
      userName: postData?.posts[0].user?.fullName,
      userHandle: postData?.posts[0].user?.userName,
      userCurrentPosition: postData?.posts[0].user?.currentPosition,
      caption: postData?.posts[0].content,
      detailed: postData?.posts[0].extraContent,
      postImage: postData?.posts[0]?.image,
      likedUsers: postData?.posts[0].likedUsers,
      commentCount: postData?.posts[0].commentCount,
      timestamp: postData?.posts[0].createdAt,
      bookmarked: postData?.posts[0].bookmarkedUsers,
    });
    setLikeCount(postData?.posts[0].likedUsers?.length);
    setLocalLiked(
      postData?.posts[0].likedUsers
        ? postData?.posts[0].likedUsers?.includes(userId)
        : false
    );
    const bookmarkedUsers = postData?.posts[0].bookmarkedUsers
      ? postData?.posts[0].bookmarkedUsers.map(({ id }) => id)
      : [];
    setLocalBookmarked(
      postData?.posts[0].bookmarkedUsers
        ? bookmarkedUsers.includes(userId)
        : false
    );
  }, [loadingPost]);

  console.log(completePost?.likedUsers);

  const [_, forceUpdate] = useReducer((x) => x + 1, 0);

  const [setLikedUserPost, { error, data }] = useMutation(SET_LIKEDUSER_POST);

  const onToggleLikePost = () => {
    setLocalLiked(!localLiked);
    if (!localLiked) {
      setLikeCount(likeCount + 1);
      setLikedUserPost({
        variables: {
          postId: completePost?.id,
          userIds: [...(completePost?.likedUsers || []), userId],
        },
      });
    } else {
      setLikeCount(likeCount - 1);
      const userIds = completePost?.likedUsers?.filter((id) => id !== userId);
      setLikedUserPost({
        variables: { postId: completePost?.id, userIds: userIds || [] },
      });
    }
  };

  const scheme = useColorScheme();
  const { theme } = getColorScheme("AUTOMATIC", scheme);
  const colors = theme.colors;

  const [setBookmarkPost, { error: error2, data: data2 }] =
    useMutation(SET_BOOKMARK_POST);
  const [removeBookmarkPost, { error: error3, data: data3 }] =
    useMutation(REMOVE_BOOKMARK_POST);

  const onToggleBookmarkPost = () => {
    setLocalBookmarked(!localBookmarked);
    if (!localBookmarked) {
      setBookmarkPost({
        variables: {
          postId: completePost?.id,
          userId: userId,
        },
      });
    } else {
      removeBookmarkPost({
        variables: {
          postId: completePost?.id,
          userId: userId,
        },
      });
    }
  };

  if (loadingPost || loadingComments) {
    return <ActivityIndicator></ActivityIndicator>;
  }

  return (
    <>
      <PostContainer>
        <Row>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Avatar imageUri={completePost?.avatar} size={60}></Avatar>
          </View>
          <HeaderRow>
            <HeaderItem>
              <TouchableOpacity
                style={{ flexDirection: "row" }}
                onPress={() =>
                  navigation.navigate("UserProfile", {
                    postId: completePost?.id,
                    userId: completePost?.postUserId,
                  })
                }
              >
                <UserText>{completePost?.userName}</UserText>
                {/* <HandleText>@{completePost?.userHandle}</HandleText> */}
                <Icon name="Dot" size={18} color="grey" />
                <TimeText>{moment(completePost?.timestamp).fromNow()}</TimeText>
              </TouchableOpacity>
              <TouchableOpacity>
                <Icon name="Dots" color={colors.text}></Icon>
              </TouchableOpacity>
            </HeaderItem>
            <HeaderItem>
              <CareerText>{completePost?.userCurrentPosition}</CareerText>
            </HeaderItem>
          </HeaderRow>
        </Row>

        <CaptionContainer>
          <CaptionText>{completePost?.caption}</CaptionText>
        </CaptionContainer>
        <DetailContainer>
          <DescriptionText>{completePost?.detailed}</DescriptionText>
        </DetailContainer>

        {completePost?.postImage ? (
          <MediaContainer>
            <MediaImage
              source={{ uri: completePost?.postImage }}
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
              <IconLabel>{completePost?.commentCount}</IconLabel>
            </IconContainer>

            <TouchableOpacity onPress={() => onToggleBookmarkPost()}>
              <Icon
                name={localBookmarked ? "Bookmarkminus" : "Bookmarkplus"}
                size={24}
                color={colors.text}
              />
            </TouchableOpacity>
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
