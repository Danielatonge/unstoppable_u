import {
  FlatList,
  Pressable,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { POSTS, USER } from "../../mock";
import { Avatar } from "../../components/Avatar";
import { MainHeader } from "../../components/MainHeader";
import { Icon } from "../../components/Icon";
import { getColorScheme } from "../../helpers";
import { PostCard } from "../../components/Home/PostCard";
import { useNavigation } from "@react-navigation/native";

export const Home = () => {
  const scheme = useColorScheme();
  const { theme } = getColorScheme("AUTOMATIC", scheme);
  const colors = theme.colors;
  const navigation = useNavigation();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      setTimeout(() => setPosts(POSTS), 2000);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const UserAvatar = (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("UserProfile");
      }}
    >
      <Avatar imageUri={USER.imageUri} />
    </TouchableOpacity>
  );

  const Settings = (
    <Pressable>
      <Icon name="Settings" size={25} color={colors.text} />
    </Pressable>
  );

  const PostItem = ({ item }) => {
    return (
      <PostCard
        id={item.id}
        avatar={item.user.imageUri}
        userName={item.user.name}
        userHandle={item.user.username}
        desc={item.content}
        likeCount={item.likeCount}
        comments={item.comments}
        timestamp={item.createdAt}
      ></PostCard>
    );
  };

  return (
    <>
      <MainHeader
        title="Home"
        logo
        leftComponent={UserAvatar}
        rightComponent={Settings}
      ></MainHeader>

      <FlatList
        data={POSTS}
        renderItem={PostItem}
        keyExtractor={(item) => item.id}
        refreshing={loading}
        onRefresh={fetchPosts}
      />
    </>
  );
};
