import { FlatList, TouchableOpacity } from "react-native";
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
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const fetchPosts = async () => {
    setLoading(true);
    try {
      await stall(500).then(() => setPosts(POSTS));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const currentUser = USER;

  return (
    <>
      <MainHeader
        title="Home"
        logo
        leftComponent={<UserAvatar imageUri={currentUser.imageUri} />}
        rightComponent={<Settings />}
      ></MainHeader>

      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <PostItem item={item} profile={false} bookmark={false} />
        )}
        keyExtractor={(item) => item.id}
        refreshing={loading}
        onRefresh={fetchPosts}
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
