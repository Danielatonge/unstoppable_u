import { FlatList, ActivityIndicator, Text } from "react-native";
import React, { useEffect, useReducer, useState } from "react";
import { MainHeader } from "../../components/MainHeader";
import { PostItem } from "../../components/Home/PostItem";
import { UserAvatar } from "../../components/UserAvatar";
import { Settings } from "../../components/Settings";
import { Icon } from "../../components/Icon";
import styled from "styled-components";
import { useNavigation } from "@react-navigation/native";
import { GET_RECENT_POST } from "../../operations/queries/post";
import { useLazyQuery, useQuery } from "@apollo/client";
import { printAsyncStorageValues } from "../../utils/asyncStorage";
import { FIND_USER_GIVEN_ID } from "../../operations/queries/user";
import { useDecodedToken } from "../../hooks/useDecodedToken";

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
  } = useQuery(GET_RECENT_POST, {
    variables: { offset: 0 },
    fetchPolicy: "network-only",
  });

  const [
    getCompleteUserGivenId,
    { data: fetchedUsers, error: errorFetchingUser, loading },
  ] = useLazyQuery(FIND_USER_GIVEN_ID, { fetchPolicy: "cache-first" });

  const decodedToken = useDecodedToken();
  //used to re-render the component
  const [_, forceUpdate] = useReducer((x) => x + 1, 0);
  //get logged in user avatar

  // console.log(loading);
  // console.log(decodedToken?.sub);

  useEffect(() => {
    const getAuthToken = async () => {
      try {
        getCompleteUserGivenId({ variables: { id: decodedToken?.sub } });
      } catch (e) {
        console.error(e);
      }
    };
    getAuthToken();
  }, [decodedToken]);

  return (
    <>
      <MainHeader
        title="Home"
        logo
        leftComponent={
          loading ? (
            <ActivityIndicator></ActivityIndicator>
          ) : (
            <UserAvatar imageUri={fetchedUsers?.users[0].userImage} />
          )
        }
        rightComponent={<Settings />}
      ></MainHeader>
      <Text> {!loadingPosts && postsData?.posts.length}</Text>
      <FlatList
        data={postsData?.posts}
        renderItem={({ item }) => (
          <PostItem
            item={item}
            userId={decodedToken?.sub}
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
          fetchMorePosts({ variables: { offset: postsData?.posts.length } })
        }
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
