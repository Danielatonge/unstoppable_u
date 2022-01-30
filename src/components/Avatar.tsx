import { View, Text, Image } from "react-native";
import React, { useState } from "react";
import styled from "styled-components";
import { USER } from "../mock";
import { User } from "../constants";

const Container = styled.View<{ size: number; border: boolean }>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: ${({ size }) => size / 2}px;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  background: #fff;
  border-color: ${({ theme }) => theme.text};
  border-width: ${({ border }) => (border ? 1 : 0)}px;
`;

const AvatarImage = styled.Image`
  resize-mode: contain;
  width: 100%;
  height: 100%;
`;

export interface AvatarProps {
  user: User;
  size?: number;
  withBorder?: boolean;
}
const initUser = {
  id: "user",
  username: "Unknown",
  name: "unknown",
  imageUri: "https://robohash.org/unknown?bgSet=bg2",
};

export const Avatar = ({
  user = initUser,
  size = 32,
  withBorder = false,
}: AvatarProps) => {
  const [uri, setUri] = useState<null | string>(null);

  return (
    <Container size={size} border={withBorder}>
      <AvatarImage source={{ uri: user.imageUri }}></AvatarImage>
    </Container>
  );
};
