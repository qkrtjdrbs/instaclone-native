import { useLazyQuery } from "@apollo/client";
import { gql } from "@apollo/client/core";
import React from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  useWindowDimensions,
  FlatList,
  Image,
} from "react-native";
import styled from "styled-components/native";
import { color } from "../color";
import DismissKeyboard from "../components/DismissKeyboard";

const SEARCH_QUERY = gql`
  query searchPhotos($keyword: String!) {
    searchPhotos(keyword: $keyword) {
      id
      file
    }
  }
`;

const MessageContainer = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;
const MessageText = styled.Text`
  margin-top: 15px;
  color: black;
  font-weight: 600;
`;

const Input = styled.TextInput``;

export default function Search({ navigation }) {
  const numColumns = 4;
  const { width } = useWindowDimensions();
  const { setValue, register, watch, handleSubmit } = useForm();
  const [startQueryFn, { loading, data, called }] = useLazyQuery(SEARCH_QUERY, {
    variables: {
      keyword: watch("keyword"),
    },
  });
  const onValid = ({ keyword }) => {
    startQueryFn({
      variables: {
        keyword,
      },
    });
  };
  const SearchBox = () => (
    <Input
      placeholder="Search Photos"
      returnKeyType="search"
      autoCorrect={false}
      onChangeText={(text) => setValue("keyword", text)}
      onSubmitEditing={handleSubmit(onValid)}
    />
  );
  useEffect(() => {
    navigation.setOptions({
      headerTitle: SearchBox,
    });
    register("keyword", {
      require: true,
      minLength: 3,
    });
  }, []);
  const renderItem = ({ item: photo }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("Photo", { photoId: photo.id })}
    >
      <Image
        source={{ uri: photo.file }}
        style={{ width: width / numColumns, height: 150 }}
      />
    </TouchableOpacity>
  );
  return (
    <DismissKeyboard>
      <View style={{ flex: 1 }}>
        {loading ? (
          <MessageContainer>
            <ActivityIndicator color={color.blue} size="large" />
            <MessageText>Searching...</MessageText>
          </MessageContainer>
        ) : null}
        {!called ? (
          <MessageContainer>
            <MessageText>Search by keyword</MessageText>
          </MessageContainer>
        ) : null}
        {data?.searchPhotos !== undefined ? (
          data?.searchPhotos?.length === 0 ? (
            <MessageContainer>
              <MessageText>Could not find anything</MessageText>
            </MessageContainer>
          ) : (
            <FlatList
              numColumns={numColumns}
              data={data?.searchPhotos}
              keyExtractor={(photo) => "" + photo.id}
              renderItem={renderItem}
            />
          )
        ) : null}
      </View>
    </DismissKeyboard>
  );
}
