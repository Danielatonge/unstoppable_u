import { View, Text, useColorScheme, TouchableOpacity } from "react-native";
import React, { ReactNode } from "react";
import styled from "styled-components";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { getColorScheme } from "../helpers";
import { Icon } from "./Icon";
import { HEADER_HEIGHT } from "../constants";

const Container = styled.View<{ insetTop: number }>`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: ${({ insetTop }) => HEADER_HEIGHT + insetTop}px;
  padding: 0 10px;
  padding-top: ${({ insetTop }) => insetTop}px;
  background: ${({ theme }) => theme.secondary};
  z-index: 2;
`;

const SectionContainer = styled.View`
  width: 33%;
`;

const Title = styled.Text`
  font-weight: 600;
  font-size: 15px;
  color: ${({ theme }) => theme.text};
`;

const BackText = styled.Text`
  font-weight: 400;
  font-size: 14px;
  color: ${({ theme }) => theme.text};
`;

const EmptyContainer = styled.View`
  width: 40px;
`;
interface Props {
  logo?: boolean;
  title: string;
  leftComponent?: ReactNode;
  rightComponent?: ReactNode;
  action?(): void;
  back?: boolean;
  close?: boolean;
  backAction?(): void;
}

export const MainHeader = ({
  logo,
  title,
  leftComponent,
  rightComponent,
  action,
  back,
  close,
  backAction,
}: Props) => {
  const scheme = useColorScheme();
  const { theme } = getColorScheme("AUTOMATIC", scheme);
  const colors = theme.colors;

  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const NoLeftComponent =
    back || close ? (
      <TouchableOpacity
        onPress={backAction ? backAction : navigation.goBack}
        style={{ flexDirection: "row", alignItems: "center" }}
      >
        <Icon
          name={back ? "ChevronLeft" : "Cross"}
          color={colors.text}
          size={24}
        />
        <BackText>{back ? "Back" : ""}</BackText>
      </TouchableOpacity>
    ) : (
      <EmptyContainer>
      </EmptyContainer>
    );

  const NoRightComponent = action ? (
    <TouchableOpacity onPress={action}>
      <Icon name="ArrowRight" color={colors.accent} size={24} />
    </TouchableOpacity>
  ) : (
    <EmptyContainer></EmptyContainer>
  );

  return (
    <Container insetTop={insets.top}>
      <SectionContainer>
        {leftComponent ? leftComponent : NoLeftComponent}
      </SectionContainer>
      <SectionContainer style={{ alignItems: "center" }}>
        {logo ? <Icon name="Logo" size={32} /> : <Title>{title}</Title>}
      </SectionContainer>
      <SectionContainer style={{ alignItems: "flex-end" }}>
        {rightComponent ? rightComponent : NoRightComponent}
      </SectionContainer>
    </Container>
  );
};
