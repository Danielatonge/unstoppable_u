import { FlatList, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { POSTS } from "../mock";

const Container = styled.View`
  background-color: #ddd;
`;

export const Home = () => {
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

  return (
    <Container>
      {/* <FlatList
        data={posts}
        renderItem={({ item }) => <Text>{JSON.stringify(item)}</Text> }
        keyExtractor={(item) => item.id}
        refreshing={loading}
        onRefresh={fetchPosts}
      /> */}
    </Container>
  );
};
