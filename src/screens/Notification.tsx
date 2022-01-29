import { Text, View } from "react-native";
import React from "react";
import styled from "styled-components/native";

const Container = styled.View`
  background-color: #ddd;
`;

export const Notification = () => {
  return (
    <Container>
      <Text> Notification</Text>
    </Container>
  );
};