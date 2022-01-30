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
import { MENTORS, POSTS, USER } from "../../mock";
import { Avatar } from "../../components/Avatar";
import { MainHeader } from "../../components/MainHeader";
import { Icon } from "../../components/Icon";
import { getColorScheme } from "../../helpers";
import { PostCard } from "../../components/Home/PostCard";
import { useNavigation } from "@react-navigation/native";
import { PostItem } from "../../components/Home/PostItem";
import { MentorCard } from "../../components/MentorCard";

export const SearchProfile = () => {
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

  const MentorItem = ({ user }) => {
    return (
      <MentorCard
        id={user.id}
        avatar={user.imageUri}
        userName={user.name}
        userHandle={user.username}
        achievement={user.achievement}
        likeCount={user.likeCount}
        followCount={user.followCount}
        tags={user.tags}
      ></MentorCard>
    );
  };

  return (
    <>
      <MainHeader
        title="Home"
        search
        leftComponent={UserAvatar}
        rightComponent={Settings}
      ></MainHeader>

      <FlatList
        data={MENTORS}
        renderItem={({ item }) => <MentorItem user={item} />}
        keyExtractor={(item) => item.id}
        refreshing={loading}
        onRefresh={fetchPosts}
      />
    </>
  );
};
