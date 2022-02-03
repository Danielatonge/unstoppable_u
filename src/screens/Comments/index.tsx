import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Comment } from "../../components/Comment";
import styled from "styled-components";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@react-navigation/native";
import { Icon } from "../../components/Icon";

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;
const InputContainer = styled.View<{ insetBottom: number }>`
  padding: 15px;
  padding-bottom: ${({ insetBottom }) => insetBottom}px;
  background: #fff;
  position: relative;
`;
const SendIconContainer = styled.Pressable<{
  insetBottom: number;
  isAndroid: boolean;
}>`
  position: absolute;
  bottom: ${({ insetBottom, isAndroid }) =>
    isAndroid ? insetBottom + 14 : insetBottom + 54}px
  right: 30px
`;

const TextBar = styled.TextInput`
  padding: 13px 50px 13px 15px;
  border-radius: 5px;
  border: 1px solid #aaa;
  color: #555;
`;

export const Comments = () => {
  const [comment, setComment] = useState("");
  const insets = useSafeAreaInsets();

  const { colors } = useTheme();
  const onSubmit = () => {
    console.log("COMMENT: ", comment);
    setComment("");
    // Send the request to the backend
  };
  return (
    <Container>
      <ScrollView style={{ padding: 15 }}>
        <Comment />
        <Comment />
      </ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "position" : "height"}
        keyboardVerticalOffset={insets.bottom + 5}
      >
        <InputContainer
          insetBottom={
            Platform.OS === "android" ? insets.bottom : insets.bottom + 45
          }
        >
          <TextBar
            value={comment}
            onChangeText={(text) => setComment(text)}
            placeholder="Add your comment..."
            returnKeyType="send"
            multiline={true}
            blurOnSubmit={true}
            enablesReturnKeyAutomatically={true}
            onSubmitEditing={onSubmit}
          />
          <SendIconContainer
            isAndroid={Platform.OS === "android"}
            insetBottom={insets.bottom}
            onPress={onSubmit}
            disabled={comment.length === 0}
            style={{ opacity: comment.length === 0 ? 0.2 : 1 }}
          >
            <Icon name="Send" size={24} color={colors.text} />
          </SendIconContainer>
        </InputContainer>
      </KeyboardAvoidingView>
    </Container>
  );
};
