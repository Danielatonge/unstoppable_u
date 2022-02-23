import {
  View,
  Text,
  useColorScheme,
  TouchableOpacity,
  ImageBackground,
  Platform,
  ActivityIndicator,
} from "react-native";
import React, { ReactNode } from "react";
import styled from "styled-components";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { getColorScheme } from "../../helpers";
import { Icon } from "../Icon";
import { PROFILE_BANNER_URL, PROFILE_HEADER_HEIGHT } from "../../constants";

const Container = styled(ImageBackground)<{
  insetTop: number;
  bgColor: string;
}>`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
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

const BackButton = styled.TouchableOpacity<{ isAndroid: boolean }>`
  flex-direction: row;
  align-items: center;
  background-color: #000;
  border-radius: 50px;
  position: absolute;
  left: 10px;
  top: ${({ isAndroid }) => (isAndroid ? 25 : 65)}px;
`;
//65px
const Title = styled.Text`
  font-weight: 600;
  font-size: 20px;
  color: ${({ theme }) => "#fff" || theme.text};
`;

const ComposeButton = styled.TouchableOpacity<{ isAndroid: boolean }>`
  border-radius: 50px;
  border-width: 2px;
  width: 100px;
  height: 40px;
  margin-top: 15px;
  padding: 0px;
  align-items: center;
  justify-content: center;
  border-color: ${({ theme }) => "white" || theme.text};
  color: white;
  position: absolute;
  right: 10px;
  top: ${({ isAndroid }) => (isAndroid ? 10 : 50)}px;
`;

const ComposeText = styled.Text`
  color: ${({ theme }) => "white" || theme.text};
  font-weight: bold;
`;

interface Props {
  profileMotivation?: string;
  backgroundImageUri?: string;
  backAction?(): void;
  create?(): void;
  loadingCreatePostBtn?: boolean;
}

export const ProfileHeader = ({
  profileMotivation,
  backgroundImageUri = PROFILE_BANNER_URL,
  backAction,
  create,
  loadingCreatePostBtn,
}: Props) => {
  const scheme = useColorScheme();
  const { theme } = getColorScheme("AUTOMATIC", scheme);
  const colors = theme.colors;

  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const isAndroid = Platform.OS === "android";

  return (
    <Container
      source={{ uri: backgroundImageUri }}
      style={{ justifyContent: "center" }}
      resizeMode="cover"
      insetTop={insets.top}
      bgColor={backgroundImageUri}
    >
      <BackButton
        isAndroid={isAndroid}
        onPress={() => {
          navigation.goBack();
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
      {create && (
        <ComposeButton isAndroid={isAndroid} onPress={create}>
          {loadingCreatePostBtn ? (
            <ActivityIndicator></ActivityIndicator>
          ) : (
            <ComposeText>Create</ComposeText>
          )}
        </ComposeButton>
      )}
    </Container>
  );
};
