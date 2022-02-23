import { View, Text, FlatList } from "react-native";
import React, { useEffect, useReducer, useState } from "react";
import { PostItem } from "../Home/PostItem";
import { useQuery } from "@apollo/client";
import { GET_POSTS_GIVEN_USERID } from "../../operations/queries/post";

export const Track = ({ route }) => {
  const { userId } = route.params;
  const [_, forceUpdate] = useReducer((x) => x + 1, 0);
  const {
    data: postsData,
    loading: loadingPosts,
    fetchMore: fetchMorePosts,
  } = useQuery(GET_POSTS_GIVEN_USERID, {
    variables: { userId: userId, offset: 0 },
    fetchPolicy: "network-only",
  });

  const userObject = {
    userImage: postsData?.users[0].userImage,
    fullName: postsData?.users[0].fullName,
    userName: postsData?.users[0].userName,
    id: postsData?.users[0].id,
  };
  return (
    <FlatList
      data={postsData?.users[0].posts}
      renderItem={({ item }) => (
        <PostTrackItem
          userObject={userObject}
          item={item}
          userId={userId}
          profile={true}
          bookmark={false}
        />
      )}
      keyExtractor={(item) => {
        return item.id;
      }}
      refreshing={loadingPosts}
      onRefresh={() => forceUpdate()}
      onEndReached={() =>
        fetchMorePosts({
          variables: { offset: postsData?.users[0].posts.length },
        })
      }
      contentContainerStyle={{ overflow: true }}
    />
  );
};

const PostTrackItem = ({ item, userId, profile, bookmark, userObject }) => {
  const trackItem = {
    ...item,
    user: userObject,
  };
  return (
    <PostItem
      item={trackItem}
      userId={userId}
      profile={profile}
      bookmark={bookmark}
    />
  );
};
