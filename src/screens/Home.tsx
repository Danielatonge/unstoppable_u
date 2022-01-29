import { Text, View } from "react-native";
import React from "react";
import styled from "styled-components/native";

const Container = styled.View`
  background-color: #ddd;
`;

export const Home = () => {
  return (
    <Container>
      <Text> What is going on</Text>
    </Container>
  );
};
