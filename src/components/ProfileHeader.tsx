import {
  View,
  Text,
  useColorScheme,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React, { ReactNode } from "react";
import styled from "styled-components";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { getColorScheme } from "../helpers";
import { Icon } from "./Icon";
import { PROFILE_BANNER_URL, PROFILE_HEADER_HEIGHT } from "../constants";

const Container = styled(ImageBackground)<{
  insetTop: number;
  bgColor: string;
}>`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: ${({ insetTop }) => PROFILE_HEADER_HEIGHT + insetTop}px;
  padding: 0 10px;
  padding-top: ${({ insetTop }) => insetTop}px;
  padding-bottom: 20px;
  background-color: ${({ bgColor }) => (bgColor ? "transparent" : "#2f2f2f")};
  z-index: 0;
  border-bottom-width: 1px;
  border-color: #ccc;
`;

const SectionContainer = styled.View``;

const BackButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  background-color: #000;
  border-radius: 50px;
  position: absolute;
  left: 10px;
  top: 65px;
`;

const Title = styled.Text`
  font-weight: 600;
  font-size: 20px;
  color: ${({ theme }) => "#fff" || theme.text};
`;

const BackText = styled.Text`
  font-weight: 400;
  font-size: 14px;
  color: ${({ theme }) => theme.text};
`;

interface Props {
  profileMotivation?: string;
  backgroundImageUri?: string;
  backAction?(): void;
}

export const ProfileHeader = ({
  profileMotivation,
  backgroundImageUri = PROFILE_BANNER_URL,
  backAction,
}: Props) => {
  const scheme = useColorScheme();
  const { theme } = getColorScheme("AUTOMATIC", scheme);
  const colors = theme.colors;

  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  return (
    <Container
      source={{ uri: backgroundImageUri }}
      style={{ justifyContent: "center" }}
      resizeMode="cover"
      insetTop={insets.top}
      bgColor={backgroundImageUri}
    >
      <BackButton
        onPress={() => {
          navigation.navigate("Feed");
        }}
        style={{ flexDirection: "row", alignItems: "center" }}
      >
        <Icon
          name="ChevronLeft"
          color={"#fff" || colors.text}
          style={{ margin: 5 }}
          size={30}
        />
      </BackButton>

      <SectionContainer style={{ alignItems: "center" }}>
        <Title>{profileMotivation}</Title>
      </SectionContainer>
    </Container>
  );
};
