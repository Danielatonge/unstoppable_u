import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { PostCard } from "../Home/PostCard";
import { POSTS } from "../../mock";
import { PostItem } from "../Home/PostItem";
import { stall } from "../../helpers";

export const Track = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

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
  return (
    <FlatList
      data={posts}
      renderItem={({ item }) => <PostItem item={item} profile={true} />}
      keyExtractor={(item) => item.id}
      refreshing={loading}
      onRefresh={fetchPosts}
      contentContainerStyle={{ overflow: "hidden" }}
    />
  );
};
