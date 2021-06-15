import { gql, useQuery } from "@apollo/client";
import React from "react";
import { FlatList } from "react-native";
import { PHOTO_FRAGMENT, COMMENT_FRAGMENT } from "../fragment";
import styled from "styled-components";
import ScreenLayout from "../components/ScreenLayout";
import Photo from "../components/Photo";

const FEED_QUERY = gql`
  query seeFeed {
    seeFeed {
      ...PhotoFragment
      user {
        userName
        avatar
      }
      caption
      comments {
        ...CommentFragment
      }
      createdAt
      isMine
    }
  }
  ${PHOTO_FRAGMENT}
  ${COMMENT_FRAGMENT}
`;

export default function Feed({ navigation }) {
  const { data, loading } = useQuery(FEED_QUERY);
  const renderPhoto = ({ item: photo }) => {
    return <Photo {...photo} />;
  };
  return (
    <ScreenLayout loading={loading}>
      <FlatList
        style={{ width: "100%" }}
        data={data?.seeFeed}
        keyExtractor={(photo) => "" + photo.id}
        renderItem={renderPhoto}
      />
    </ScreenLayout>
  );
}
