import {
  View,
  Text,
  Image,
  TouchableOpacity,
  useColorScheme,
  TextInput,
  Platform,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { POSTS } from "../mock";
import styled from "styled-components";
import { SCREEN_PADDING } from "../theme";
import { Avatar } from "../components/Avatar";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "../components/Icon";
import moment from "moment";
import { getColorScheme } from "../helpers";
import { PostItem } from "../components/Home/PostItem";
import * as ImagePicker from "expo-image-picker";
import { ProfileHeader } from "../components/Profile/ProfileHeader";
import { ComposeAction } from "../components/ComposeAction";
import { CREATE_POST } from "../operations/mutations/post";
import { useMutation } from "@apollo/client";
import { GET_RECENT_POST } from "../operations/queries/post";

const Wrapper = styled.View<{ profile: boolean }>`
  background: ${({ theme }) => theme.secondary};
  border-bottom-width: 1px;
  border-color: #ccc;
`;
const PostContainer = styled.ScrollView`
  padding: ${SCREEN_PADDING}px;
  padding-bottom: 0px;
  height: 100%;
`;

const Row = styled.View`
  flex-direction: row;
`;

const HeaderRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex: 1;
`;

const HeaderItem = styled.View`
  flex-direction: row;
  align-items: center;
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

const CaptionText = styled.Text`
  color: ${({ theme }) => theme.text};
  padding: 2px;
  padding-left: 0px;
  font-size: 14px;
  font-weight: 500;
`;

const DescriptionText = styled.Text`
  color: ${({ theme }) => theme.text};
  line-height: 18px;
`;
const BackButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  background-color: #000;
  border-radius: 50px;
  margin-left: 10px;
  opacity: 1;
`;

export const ComposePost = ({ route }) => {
  const { userId, userImage } = route.params;
  const navigation = useNavigation();

  const scheme = useColorScheme();
  const { theme } = getColorScheme("AUTOMATIC", scheme);
  const colors = theme.colors;
  const isAndroid = Platform.OS === "android";

  const avatar = userImage;

  const [addDesc, setAddDesc] = useState(false);
  const [selectImg, setSelectImg] = useState(false);
  const [addLink, setAddLink] = useState(false);
  const [caption, onChangeCaption] = useState("");
  const [detailed, onChangeDetailed] = useState("");
  const [image, setImage] = useState(null);
  const [link, onChangeLink] = useState("");

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log("Result: ", result);
    console.log(userId);

    if (!result.cancelled) {
      setImage(result.uri);
      setSelectImg(true);
    } else {
      setImage(null);
      setSelectImg(false);
    }
  };
  const [createUserPost, { loading: loadingCreatePost, data: data3 }] = useMutation(
    CREATE_POST,
    {
      onCompleted: () => navigation.goBack(),
      refetchQueries: [GET_RECENT_POST],
    }
  );

  const createPost = () => {
    if (caption) {
      createUserPost({
        variables: {
          content: caption,
          extraContent: detailed,
          links: link,
          userId: userId,
        },
      });
      console.log("CAPTION:", caption);
      console.log("Description:", detailed);
      console.log(userId);
      onChangeCaption("");
      onChangeDetailed("");
      setImage(null);
      onChangeLink("");
    }
  };
  return (
    <Wrapper>
      <ProfileHeader
        create={createPost}
        loadingCreatePostBtn={loadingCreatePost}
      ></ProfileHeader>
      <Avatar
        imageUri={avatar}
        size={60}
        style={{
          borderWidth: 3,
          borderColor: "#fff",
          position: "absolute",
          top: isAndroid ? 90 : 130,
          left: 10,
          elevation: 4,
          zIndex: 4,
        }}
      ></Avatar>
      <PostContainer>
        <Row>
          <View
            style={{ alignItems: "center", justifyContent: "center" }}
          ></View>
          <HeaderRow>
            <View></View>
            <HeaderItem>
              <ComposeAction
                iconName="Description"
                setState={setAddDesc}
                action={() => {}}
              />

              <ComposeAction
                iconName="Link"
                setState={setAddLink}
                action={() => {}}
              />
              <BackButton
                onPress={() => pickImage()}
                style={{ alignItems: "center", justifyContent: "center" }}
              >
                <Icon
                  name="Photo"
                  color={"#fff"}
                  style={{ margin: 10 }}
                  size={20}
                />
              </BackButton>
            </HeaderItem>
          </HeaderRow>
        </Row>

        <CaptionContainer>
          <CaptionText>Caption</CaptionText>
          <TextInput
            style={{
              height: 120,
              borderWidth: 1,
              borderColor: "#eee",
              borderRadius: 8,
              padding: 10,
              fontSize: 16,
              lineHeight: 22,
            }}
            multiline
            numberOfLines={4}
            maxLength={200}
            value={caption}
            onChangeText={(text) => onChangeCaption(text)}
            placeholder="Any accomplishments? (200 characters)"
          />
        </CaptionContainer>
        {addDesc && (
          <CaptionContainer>
            <CaptionText>Detailed</CaptionText>
            <TextInput
              style={{
                height: 120,
                borderWidth: 1,
                borderColor: "#eee",
                borderRadius: 8,
                padding: 10,
                fontSize: 16,
                lineHeight: 22,
              }}
              multiline
              numberOfLines={4}
              value={detailed}
              onChangeText={(text) => onChangeDetailed(text)}
              placeholder="What reflections did you make?"
            />
          </CaptionContainer>
        )}
        {image && (
          <MediaContainer>
            <Image
              source={{ uri: image }}
              style={{ width: 300, height: 200, borderRadius: 10 }}
            />
          </MediaContainer>
        )}

        {addLink && (
          <CaptionContainer>
            <CaptionText>Links</CaptionText>
            <TextInput
              style={{
                height: 60,
                borderWidth: 1,
                borderColor: "#eee",
                borderRadius: 8,
                padding: 10,
                fontSize: 16,
                lineHeight: 22,
              }}
              multiline
              numberOfLines={2}
              value={link}
              onChangeText={(text) => onChangeLink(text)}
              placeholder="Extra resources"
            />
          </CaptionContainer>
        )}
      </PostContainer>
    </Wrapper>
  );
};
