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

const Container = styled.View`
  background-color: #fff;
`;

export const Home = () => {
  const scheme = useColorScheme();
  const { theme } = getColorScheme("AUTOMATIC", scheme);
  const colors = theme.colors;

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
    <TouchableOpacity>
      <Avatar user={USER} />
    </TouchableOpacity>
  );

  const Settings = (
    <Pressable>
      <Icon name="Settings" size={25} color={colors.text} />
    </Pressable>
  );

  return (
    <>
      <MainHeader
        title="Home"
        logo
        leftComponent={UserAvatar}
        rightComponent={Settings}
      ></MainHeader>

      {/* <FlatList
        data={posts}
        renderItem={({ item }) => <Text>{JSON.stringify(item)}</Text> }
        keyExtractor={(item) => item.id}
        refreshing={loading}
        onRefresh={fetchPosts}
      /> */}
    </>
  );
};
