import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { Image, TouchableOpacity, useWindowDimensions } from "react-native";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const Container = styled.View``;
const Header = styled.TouchableOpacity`
  padding: 10px;
  flex-direction: row;
  align-items: center;
`;
const UserAvatar = styled.Image`
  margin-right: 10px;
  width: 25px;
  height: 25px;
  border-radius: 12.5px;
`;
const Username = styled.Text`
  font-weight: 700;
`;
const File = styled.Image``;
const Actions = styled.View`
  flex-direction: row;
  align-items: center;
`;
const Action = styled.TouchableOpacity`
  margin-right: 13px;
`;
const Caption = styled.View`
  flex-direction: row;
`;
const CaptionText = styled.Text`
  margin-left: 8px;
`;
const Likes = styled.Text`
  margin: 5px 0px;
  font-weight: 600;
`;
const ExtraContainer = styled.View`
  padding: 10px;
`;

export default function Photo({ id, user, isLiked, file, likes, caption }) {
  const navigation = useNavigation();
  const { width, height } = useWindowDimensions();
  const [imageHeight, setImageHeight] = useState(height - 450);
  useEffect(() => {
    Image.getSize(file, () => {
      setImageHeight(height / 3);
    });
    setImageHeight();
  }, [file]);
  return (
    <Container>
      <Header onPress={() => navigation.navigate("Profile")}>
        <UserAvatar resizeMode="cover" source={{ uri: user.avatar }} />
        <Username>{user.userName}</Username>
      </Header>
      <File
        resizeMode="contain"
        style={{ width, height: imageHeight }}
        source={{ uri: file }}
      />
      <ExtraContainer>
        <Actions>
          <Action>
            <Ionicons
              name={isLiked ? "heart" : "heart-outline"}
              color={isLiked ? "tomato" : "black"}
              size={27}
            />
          </Action>
          <Action onPress={() => navigation.navigate("Comments")}>
            <Ionicons name="chatbubble-outline" size={27} />
          </Action>
        </Actions>
        <TouchableOpacity onPress={() => navigation.navigate("Likes")}>
          <Likes>{likes === 1 ? "1 like" : `${likes} likes`}</Likes>
        </TouchableOpacity>
        <Caption>
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <Username>{user.userName}</Username>
          </TouchableOpacity>
          <CaptionText>{caption}</CaptionText>
        </Caption>
      </ExtraContainer>
    </Container>
  );
}

Photo.propTypes = {
  id: PropTypes.number.isRequired,
  user: PropTypes.shape({
    avatar: PropTypes.string,
    userName: PropTypes.string.isRequired,
  }),
  file: PropTypes.string.isRequired,
  isLiked: PropTypes.bool.isRequired,
  likes: PropTypes.number.isRequired,
  caption: PropTypes.string,
  commentNumber: PropTypes.number.isRequired,
};
