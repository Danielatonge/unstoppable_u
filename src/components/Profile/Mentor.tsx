import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { MENTORS } from "../../mock";
import { MentorItem } from "../Search/MentorItem";
import { stall } from "../../helpers";

export const Mentor = ({userId}) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchResults = async () => {
    setLoading(true);
    try {
        await stall(500).then(() => setResults(MENTORS));
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
