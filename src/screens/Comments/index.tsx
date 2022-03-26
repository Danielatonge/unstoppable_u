import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useReducer, useState } from "react";
import { Comment } from "../../components/Comment";
import styled from "styled-components";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@react-navigation/native";
import { Icon } from "../../components/Icon";
import { useMutation, useQuery } from "@apollo/client";
import { GET_COMMENTS } from "../../operations/queries/comment";
import { CREATE_COMMENT } from "../../operations/mutations/comment";

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;
const InputContainer = styled.View<{ insetBottom: number }>`
  padding: 15px;
  padding-bottom: ${({ insetBottom }) => insetBottom}px;
  background: #fff;
  position: relative;
`;
const SendIconContainer = styled.Pressable<{
  insetBottom: number;
  isAndroid: boolean;
}>`
  position: absolute;
  bottom: ${({ insetBottom, isAndroid }) =>
    isAndroid ? insetBottom + 14 : insetBottom + 54}px
  right: 30px
`;

const TextBar = styled.TextInput`
  padding: 13px 50px 13px 15px;
  border-radius: 5px;
  border: 1px solid #aaa;
  color: #555;
`;

export const Comments = ({ route }) => {
  const { postId, userId } = route.params;
  const [comment, setComment] = useState("");
  const insets = useSafeAreaInsets();
  const [_, forceUpdate] = useReducer((x) => x + 1, 0);

  const [createComment, { loading: creatingComment, data: data1 }] =
    useMutation(CREATE_COMMENT, {
      refetchQueries: [GET_COMMENTS],
    });

  console.log({ postId, userId });

  const {
    data: commentsData,
    loading: loadingComments,
    fetchMore: fetchMoreComments,
  } = useQuery(GET_COMMENTS, {
    variables: { postId: postId },
    fetchPolicy: "network-only",
  });

  const { colors } = useTheme();
  const onSubmit = () => {
    console.log("COMMENT: ", comment);
    setComment("");
    createComment({
      variables: {
        postId,
        userId,
        content: comment,
      },
    });
    // Send the request to the backend
  };
  console.log(creatingComment);

  return (
    <Container>
      <FlatList
        style={{ padding: 15 }}
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
        onEndReachedThreshold={0.2}
        removeClippedSubviews
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "position" : "height"}
        keyboardVerticalOffset={insets.bottom + 5}
      >
        <InputContainer
          insetBottom={
            Platform.OS === "android" ? insets.bottom : insets.bottom + 45
          }
        >
          <TextBar
            value={comment}
            onChangeText={(text) => setComment(text)}
            placeholder="Add your comment..."
            returnKeyType="send"
            multiline={true}
            blurOnSubmit={true}
            enablesReturnKeyAutomatically={true}
            onSubmitEditing={onSubmit}
          />
          <SendIconContainer
            isAndroid={Platform.OS === "android"}
            insetBottom={insets.bottom}
            onPress={onSubmit}
            disabled={comment.length === 0}
            style={{ opacity: comment.length === 0 ? 0.2 : 1 }}
          >
            {creatingComment ? (
              <ActivityIndicator></ActivityIndicator>
            ) : (
              <Icon name="Send" size={24} color={colors.text} />
            )}
          </SendIconContainer>
        </InputContainer>
      </KeyboardAvoidingView>
    </Container>
  );
};

export const CommentItem = ({ comment, userId }) => {
  const alreadyLiked = comment.likedUsers
    ? comment.likedUsers?.includes(userId)
    : false;
  return (
    <Comment
      id={comment.id}
      commentUserId={comment.user?.id}
      userUri={comment.user?.userImage}
      username={comment.user?.fullName}
      userhandle={comment.user?.userHandle}
      currentPosition={comment.user?.currentPosition}
      createdAt={comment.createdAt}
      content={comment.content}
      likedUsers={comment.likedUsers}
      alreadyLiked={alreadyLiked}
      userId={userId}
    />
  );
};
