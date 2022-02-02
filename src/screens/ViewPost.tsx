import {
  View,
  Text,
  Image,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import React from "react";
import { POSTS } from "../mock";
import styled from "styled-components";
import { SCREEN_PADDING } from "../theme";
import { Avatar } from "../components/Avatar";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "../components/Icon";
import moment from "moment";
import { getColorScheme } from "../helpers";
import { PostItem } from "../components/Home/PostItem";

const Wrapper = styled.ScrollView<{ profile: boolean }>`
  background: ${({ theme }) => theme.secondary};
  border-bottom-width: 1px;
  border-color: #ccc;
`;
const PostContainer = styled.View`
  padding: ${SCREEN_PADDING}px;
  padding-bottom: 0px;
  border-bottom-width: 1px;
  border-color: #ccc;
`;

const Row = styled.View`
  flex-direction: row;
`;

const HeaderRow = styled.View`
  flex-direction: column;
  flex: 1;
`;

const HeaderItem = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  margin-left: 10px;
  flex: 1;
`;

const UserText = styled.Text`
  color: ${({ theme }) => theme.text};
  margin-right: 5px;
  font-weight: 800;
`;

const HandleText = styled.Text`
  color: ${({ theme }) => theme.text};
`;
const CareerText = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.text};
`;
const TimeText = styled.Text`
  color: ${({ theme }) => theme.text};
`;

const MediaImage = styled.Image`
  width: 300px;
  height: 200px;
  border-radius: 10px;
`;


const CaptionContainer = styled.View`
  margin-vertical: 4px;
`;

const DetailContainer = styled.View`
  margin-vertical: 4px;
`;

const MediaContainer = styled.View`
  margin-vertical: 4px;
`;

const ActionContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-vertical: 10px;
`;

const CaptionText = styled.Text`
  color: ${({ theme }) => theme.text};
  line-height: 18px;
  font-size: 14px;
  font-weight: 500;
`;

const DescriptionText = styled.Text`
  color: ${({ theme }) => theme.text};
  line-height: 18px;
`;

const IconContainer = styled.TouchableOpacity`
  flex-direction: row;
  margin-right: 30px;
`;

const IconLabel = styled.Text`
  color: ${({ theme }) => theme.text};
  align-self: center;
  margin-left: 4px;
`;

const CommentContainer = styled.View`
  padding-left: 0px;
`;

export const ViewPost = () => {
  const navigation = useNavigation();

  const scheme = useColorScheme();
  const { theme } = getColorScheme("AUTOMATIC", scheme);
  const colors = theme.colors;

  const item = POSTS[0];
  const id = item.id;
  const avatar = item.user.imageUri;
  const userName = item.user.name;
  const userHandle = item.user.username;
  const userCurrentPosition = item.user.currentPosition;
  const caption = item.content;
  const detailed = item.detailed;
  const postImage = item.image;
  const likeCount = item.likeCount;
  const commentCount = item.commentCount;
  const timestamp = item.createdAt;
  const bookmark = false;

  const comments = POSTS;

  return (
    <Wrapper>
      <PostContainer>
        <Row>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Avatar imageUri={avatar} size={60}></Avatar>
          </View>
          <HeaderRow>
            <HeaderItem>
              <TouchableOpacity
                style={{ flexDirection: "row" }}
                onPress={() => navigation.navigate("UserProfile")}
              >
                <UserText>{userName}</UserText>
                <HandleText>@{userHandle}</HandleText>
              </TouchableOpacity>
              <TouchableOpacity>
                <Icon name="Dots" color={colors.text}></Icon>
              </TouchableOpacity>
            </HeaderItem>
            <HeaderItem>
              <CareerText>{userCurrentPosition}</CareerText>
            </HeaderItem>
            <HeaderItem>
              <TimeText>{moment(timestamp).fromNow()}</TimeText>
            </HeaderItem>
          </HeaderRow>
        </Row>

        <CaptionContainer>
          <CaptionText>{caption}</CaptionText>
        </CaptionContainer>
        <DetailContainer>
          <DescriptionText>{detailed}</DescriptionText>
        </DetailContainer>
        <MediaContainer>
          <MediaImage
            source={{ uri: postImage }}
            style={{ width: 300, height: 200 }}
          />
        </MediaContainer>
        <ActionContainer>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Text
              style={{ color: colors.text, fontSize: 14, fontWeight: "500" }}
            >
              Comments
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <IconContainer>
              <Icon name="Heart" size={24} color={colors.text} />
              <IconLabel>{likeCount}</IconLabel>
            </IconContainer>
            <IconContainer>
              <Icon name="Bubble" size={24} color={colors.text} />
              <IconLabel>{commentCount}</IconLabel>
            </IconContainer>

            {bookmark ? (
              <TouchableOpacity>
                <Icon name="Bookmarkminus" size={24} color={colors.text} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity>
                <Icon name="Bookmarkplus" size={24} color={colors.text} />
              </TouchableOpacity>
            )}
          </View>
        </ActionContainer>
      </PostContainer>
      <CommentContainer>
        {comments.map((comment, index) => (
          <PostItem
            key={index.toString()}
            item={comment}
            comment={true}
          ></PostItem>
        ))}
      </CommentContainer>
    </Wrapper>
  );
};
