import {
  View,
  Text,
  useColorScheme,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { ReactNode, useState } from "react";
import styled from "styled-components";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { getColorScheme } from "../helpers";
import { Icon } from "./Icon";
import { HEADER_HEIGHT } from "../constants";
import { SearchUniverse } from "./Search/SearchUniverse";

const Container = styled.View<{ insetTop: number }>`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: ${({ insetTop }) => HEADER_HEIGHT + insetTop}px;
  padding: 0 10px;
  padding-top: ${({ insetTop }) => insetTop}px;
  background: ${({ theme }) => theme.secondary};
  z-index: 2;
  border-bottom-width: 1px;
  border-color: #ccc;
`;

const SectionContainer = styled.View<{ index: number }>`
  width: ${({ index }) => (index !== 2 ? "10%" : "70%")};
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
  search?: boolean;
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
  search,
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
      <EmptyContainer></EmptyContainer>
    );

  const NoRightComponent = action ? (
    <TouchableOpacity onPress={action}>
      <Icon name="ArrowRight" color={colors.accent} size={24} />
    </TouchableOpacity>
  ) : (
    <EmptyContainer></EmptyContainer>
  );

  const CenterComponent = () => {
    if (logo) {
      return <Icon name="Logo" size={32} />;
    }
    if (search) {
      return <SearchUniverse />;
    }
    return <Title>{title}</Title>;
  };

  return (
    <Container insetTop={insets.top}>
      <SectionContainer index={1}>
        {leftComponent ? leftComponent : NoLeftComponent}
      </SectionContainer>
      <SectionContainer index={2} style={{ alignItems: "center" }}>
        {CenterComponent()}
      </SectionContainer>
      <SectionContainer index={3} style={{ alignItems: "flex-end" }}>
        {rightComponent ? rightComponent : NoRightComponent}
      </SectionContainer>
    </Container>
  );
};
