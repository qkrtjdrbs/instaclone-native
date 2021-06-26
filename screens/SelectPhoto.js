import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import * as MediaLibrary from "expo-media-library";
import { Ionicons } from "@expo/vector-icons";
import useWindowDimensions from "react-native/Libraries/Utilities/useWindowDimensions";
import { color } from "../color";

const Container = styled.View`
  flex: 1;
`;
const Top = styled.View`
  flex: 1;
`;
const Bottom = styled.View`
  flex: 1;
`;

const ImageContainer = styled.TouchableOpacity``;
const IconContainer = styled.View`
  position: absolute;
  bottom: 5px;
  right: 0px;
`;
const HeaderRightText = styled.Text`
  font-size: 15px;
  font-weight: 700;
  margin-right: 8px;
  color: ${color.blue};
`;

export default function SelectPhoto({ navigation }) {
  const [ok, setOk] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [chosenPhoto, setChosenPhoto] = useState("");
  const getPhotos = async () => {
    //Bring up all of user's photos
    const { assets: photos } = await MediaLibrary.getAssetsAsync();
    setPhotos(photos);
    setChosenPhoto(photos[0]?.uri);
  };
  const getPermissions = async () => {
    const { status, canAskAgain } = await MediaLibrary.getPermissionsAsync();
    //Verify that you have granted permission to the user
    if ((status === "undetermined" || status === "denied") && canAskAgain) {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "undetermined" || status !== "denied") {
        setOk(true);
        getPhotos();
      }
    } else if (status !== "undetermined" || status !== "denied") {
      setOk(true);
      getPhotos();
    }
  };
  useEffect(() => {
    getPermissions();
  }, []);
  const HeaderRight = () => (
    <TouchableOpacity>
      <HeaderRightText>Next</HeaderRightText>
    </TouchableOpacity>
  );
  useEffect(() => {
    navigation.setOptions({
      headerRight: HeaderRight,
    });
  });
  const { width } = useWindowDimensions();
  const choosePhoto = (uri) => {
    setChosenPhoto(uri);
  };
  const renderItem = ({ item: photo }) => (
    <ImageContainer onPress={() => choosePhoto(photo.uri)}>
      <Image
        source={{ uri: photo.uri }}
        style={{ width: width / 4, height: 100 }}
      />
      <IconContainer>
        <Ionicons
          name="checkmark-circle"
          size={18}
          color={photo.uri === chosenPhoto ? color.blue : "white"}
        />
      </IconContainer>
    </ImageContainer>
  );
  return (
    <Container>
      <Top>
        {chosenPhoto !== "" ? (
          <Image
            source={{ uri: chosenPhoto }}
            style={{ width, height: "100%" }}
          />
        ) : null}
      </Top>
      <Bottom>
        <FlatList
          data={photos}
          numColumns={4}
          keyExtractor={(photo) => photo.id}
          renderItem={renderItem}
        />
      </Bottom>
    </Container>
  );
}
