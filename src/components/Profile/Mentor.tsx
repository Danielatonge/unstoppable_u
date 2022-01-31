import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { MENTORS } from "../../mock";
import { MentorItem } from "../Search/MentorItem";

export const Mentor = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchResults = async () => {
    setLoading(true);
    try {
      setTimeout(() => setResults(MENTORS), 2000);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  return (
    <FlatList
      data={results}
      renderItem={({ item }) => <MentorItem user={item} />}
      keyExtractor={(item) => item.id}
      refreshing={loading}
      onRefresh={fetchResults}
    />
  );
};
