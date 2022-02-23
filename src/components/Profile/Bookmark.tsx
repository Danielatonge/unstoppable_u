import { View, Text, FlatList } from "react-native";
import React, { useEffect, useReducer, useState } from "react";
import { PostItem } from "../Home/PostItem";
import { useQuery } from "@apollo/client";
import { GET_BOOKMARKED_POSTS_GIVEN_USERID } from "../../operations/queries/post";

export const Bookmark = ({ route }) => {
  const { userId } = route.params;
  const [_, forceUpdate] = useReducer((x) => x + 1, 0);
  const {
    data: postsData,
    loading: loadingPosts,
    fetchMore: fetchMorePosts,
  } = useQuery(GET_BOOKMARKED_POSTS_GIVEN_USERID, {
    variables: { offset: 0, userId: userId },
    fetchPolicy: "no-cache",
  });
  return (
    <FlatList
      data={postsData?.users[0].bookmarkedPosts}
      renderItem={({ item }) => (
        <PostItem
          item={item}
          userId={userId}
          profile={false}
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
          variables: { offset: postsData?.users[0].bookmarkedPosts.length },
        })
      }
    />
  );
};
