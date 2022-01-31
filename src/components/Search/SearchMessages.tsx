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

const SearchBar = styled.View`
  align-items: center;
  background-color: white;
  height: 46px;
  justify-content:center
  margin-top: -1px;
  z-index: 2;
  border-bottom-width: 0.5px;
  border-color: #ccc;
`;

export const SearchMessages = () => {
  const [text, onChangeText] = useState(null);
  return (
    <SearchBar>
      <SearchInput
        onChangeText={onChangeText}
        value={text}
        placeholder="Search Messages"
        placeholderTextColor="#999"
      />
    </SearchBar>
  );
};
