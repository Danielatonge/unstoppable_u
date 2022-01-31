import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { POSTS } from "../../mock";
import { PostItem } from "../Home/PostItem";
import { stall } from "../../helpers";

export const Bookmark = () => {
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
      renderItem={({ item }) => (
        <PostItem item={item} profile={false} bookmark={true} />
      )}
      keyExtractor={(item) => item.id}
      refreshing={loading}
      onRefresh={fetchPosts}
    />
  );
};
