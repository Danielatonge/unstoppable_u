import { FlatList } from "react-native";
import React, { useEffect, useState } from "react";

import { MENTORS, POSTS, USER } from "../../mock";

import { MainHeader } from "../../components/MainHeader";
import { MentorCard } from "../../components/Search/MentorCard";
import { MentorItem } from "../../components/Search/MentorItem";
import { UserAvatar } from "../../components/UserAvatar";
import { Settings } from "../../components/Settings";
import styled from "styled-components";

const SuggestionText = styled.Text`
  padding: 0px 10px;
  font-size: 18px;
  font-weight: 800;
  color: ${({ theme }) => theme.text};
`;

const SuggestionBar = styled.View`
  justify-content: center;
  background-color: ${({ theme }) => theme.secondary};
  height: 40px;
  border-bottom-width: 0.5px;
  border-color: #ccc;
`;

export const SearchProfile = () => {
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

  const currentUser = USER;

  return (
    <>
      <MainHeader
        title="Home"
        search
        leftComponent={<UserAvatar imageUri={currentUser.imageUri} />}
        rightComponent={<Settings />}
      ></MainHeader>
      <SuggestionBar>
        <SuggestionText>Suggestions for you</SuggestionText>
      </SuggestionBar>
      <FlatList
        data={results}
        renderItem={({ item }) => <MentorItem user={item} />}
        keyExtractor={(item) => item.id}
        refreshing={loading}
        onRefresh={fetchResults}
      />
    </>
  );
};
