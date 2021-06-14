import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { PHOTO_FRAGMENT, COMMENT_FRAGMENT } from "../fragment";
import styled from "styled-components";

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
  const { data } = useQuery(FEED_QUERY);
  return (
    <View>
      <Text>Feed</Text>
    </View>
  );
}
