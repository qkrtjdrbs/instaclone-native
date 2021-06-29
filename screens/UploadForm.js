import React, { useEffect } from "react";
import { ReactNativeFile } from "apollo-upload-client";
import { useForm } from "react-hook-form";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import DismissKeyboard from "../components/DismissKeyboard";
import { Ionicons } from "@expo/vector-icons";
import { color } from "../color";
import { gql, useMutation } from "@apollo/client";
import { FEED_PHOTO } from "../fragment";

const UPLOAD_PHOTO_MUTATION = gql`
  mutation uploadPhoto($file: Upload!, $caption: String) {
    uploadPhoto(file: $file, caption: $caption) {
      ...FeedPhoto
    }
  }
  ${FEED_PHOTO}
`;

const Container = styled.View`
  flex: 1;
  padding: 0px 50px;
`;
const Photo = styled.Image`
  height: 300px;
`;
const CaptionContainer = styled.View`
  margin-top: 30px;
`;
const Caption = styled.TextInput`
  padding: 10px 20px;
  border-radius: 100px;
`;

export default function UploadForm({ route, navigation }) {
  const updateUploadPhoto = (cache, result) => {
    const {
      data: { uploadPhoto },
    } = result;
    if (uploadPhoto.id) {
      cache.modify({
        id: "ROOT_QUERY",
        fields: {
          seeFeed(prev) {
            return [uploadPhoto, ...prev];
          },
        },
      });
      navigation.navigate("Tabs");
    }
  };
  const [uploadPhotoMutation, { loading }] = useMutation(
    UPLOAD_PHOTO_MUTATION,
    { update: updateUploadPhoto }
  );
  const HeaderRight = () => (
    <TouchableOpacity onPress={handleSubmit(onValid)}>
      <Ionicons
        name={"arrow-forward"}
        color={color.blue}
        size={28}
        style={{ marginRight: 10 }}
      />
    </TouchableOpacity>
  );
  const HeaderRightLoading = () => (
    <ActivityIndicator
      size="small"
      color={color.blue}
      style={{ marginRight: 10 }}
    />
  );
  const { register, handleSubmit, setValue } = useForm();
  useEffect(() => {
    register("caption");
  }, [register]);
  useEffect(() => {
    navigation.setOptions({
      headerRight: loading ? HeaderRightLoading : HeaderRight,
      ...(loading && { headerLeft: () => null }),
    });
  }, [loading]);
  const onValid = ({ caption }) => {
    const file = new ReactNativeFile({
      uri: route.params.file,
      name: `123.jpg`,
      type: "image/jpeg",
    });
    uploadPhotoMutation({ variables: { caption, file } });
  };
  return (
    <DismissKeyboard>
      <Container>
        <Photo resizeMode="contain" source={{ uri: route.params.file }} />
        <CaptionContainer>
          <Caption
            returnKeyType="done"
            placeholder="Write a caption..."
            onChangeText={(text) => setValue("caption", text)}
            onSubmitEditing={handleSubmit(onValid)}
          />
        </CaptionContainer>
      </Container>
    </DismissKeyboard>
  );
}
