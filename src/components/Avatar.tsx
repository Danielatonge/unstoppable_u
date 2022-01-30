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

// const AvatarImage = styled.Image`
//   resize-mode: contain;
//   width: 100%;
//   height: 100%;
// `;

export interface AvatarProps {
  imageUri: string;
  size?: number;
  withBorder?: boolean;
  style?: object;
}

export const Avatar = ({
  imageUri = "https://robohash.org/unknown?bgSet=bg2",
  size = 32,
  withBorder = false,
  style,
}: AvatarProps) => {
  const [uri, setUri] = useState<null | string>(null);

  return (
    <Container size={size} border={withBorder} style={style}>
      <View>
        <Image
          style={{
            resizeMode: "contain",
            width: 100,
            height: 100,
          }}
          source={{
            uri: imageUri,
          }}
        ></Image>
      </View>
    </Container>
  );
};
