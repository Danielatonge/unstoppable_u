import { FlatList, TouchableOpacity, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { POSTS, USER } from "../../mock";
import { MainHeader } from "../../components/MainHeader";
import { PostItem } from "../../components/Home/PostItem";
import { UserAvatar } from "../../components/UserAvatar";
import { Settings } from "../../components/Settings";
import { stall } from "../../helpers";
import { Icon } from "../../components/Icon";
import styled from "styled-components";
import { useNavigation } from "@react-navigation/native";
import { GET_RECENT_POST } from "../../operations/queries/post";
import { useQuery } from "@apollo/client";

const NewPostButton = styled.TouchableOpacity`
  background-color: #6dce9e;
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  border-radius: 50px;
  align-items: center;
  justify-content: center;
`;

export const Home = () => {
  const navigation = useNavigation();

  const {
    data: postsData,
    loading: loadingPosts,
    fetchMore: fetchMorePosts,
  } = useQuery(GET_RECENT_POST);

  console.log(postsData);
  const currentUser = USER;

  if (loadingPosts) {
    return <Text>Loading .....</Text>;
  }

  return (
    <>
      <MainHeader
        title="Home"
        logo
        leftComponent={<UserAvatar imageUri={currentUser.imageUri} />}
        rightComponent={<Settings />}
      ></MainHeader>

      <FlatList
        data={postsData?.posts}
        renderItem={({ item }) => (
          <PostItem item={item} profile={false} bookmark={false} />
        )}
        keyExtractor={(item) => item.id}
        refreshing={loadingPosts}
      />
      <NewPostButton
        activeOpacity={0.8}
        onPress={() => navigation.navigate("ComposePost")}
      >
        <Icon name="Plus" size={35} />
      </NewPostButton>
    </>
  );
};
// onRefresh={fetchMorePosts}
