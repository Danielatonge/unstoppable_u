import { View, Text } from "react-native";
import React, { useState } from "react";
import styled from "styled-components";

const SearchInput = styled.TextInput`
  border-radius: 50px;
  height: 32px;
  padding: 0px 40px;
  font-size: 16px;
  width: 90%;
  background-color: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.text};
`;

export const SearchUniverse = () => {
  const [text, onChangeText] = useState(null);
  return (
    <SearchInput
      onChangeText={onChangeText}
      value={text}
      placeholder="Search Our Universe"
    />
  );
};
