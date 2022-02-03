import { View, Text, ViewStyle, ActivityIndicator } from "react-native";
import React from "react";
import styled from "styled-components";
import { BUTTON_WIDTH } from "../../constants";
import { useTheme } from "@react-navigation/native";

const Container = styled.TouchableOpacity<{ fill: boolean }>`
  width: ${BUTTON_WIDTH}px;
  padding: 10px;
  background: ${({ theme, fill }) => (fill ? theme.accent : "transparent")};
  border-radius: 50px;
  align-items: center;
  border-width: ${({ fill }) => (fill ? 0 : 1)}px;
  border-color: ${({ theme }) => theme.text};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

const ButtonText = styled.Text<{ fill: boolean }>`
  font-weight: 600;
  font-size: 14px;
  color: ${({ theme, fill }) => (fill ? "#fff" : theme.text)};
`;

interface Props {
  onPress(): void;
  title: string;
  fill?: boolean;
  style?: ViewStyle;
  disabled?: boolean;
  loading?: boolean;
}
export const SimpleButton = ({
  onPress,
  title,
  fill = true,
  style,
  loading = false,
  disabled = false,
}: Props) => {
  const { colors } = useTheme();

  return (
    <Container
      style={{ ...style }}
      onPress={onPress}
      fill={fill}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator
          color={fill ? colors.secondary : colors.secondaryText}
        />
      ) : (
        <ButtonText fill={fill}>{title}</ButtonText>
      )}
    </Container>
  );
};
