import { gql, useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { PHOTO_FRAGMENT, COMMENT_FRAGMENT } from "../fragment";
import ScreenLayout from "../components/ScreenLayout";
import Photo from "../components/Photo";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

const FEED_QUERY = gql`
  query seeFeed($offset: Int!) {
    seeFeed(offset: $offset) {
      ...PhotoFragment
      user {
        id
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
  const { data, loading, refetch, fetchMore } = useQuery(FEED_QUERY, {
    variables: {
      offset: 0,
    },
  });
  const renderPhoto = ({ item: photo }) => {
    return <Photo {...photo} />;
  };
  const refresh = async () => {
    setRefreshing(true);
    await refetch({ offset: 0 });
    setRefreshing(false);
  };
  const [refreshing, setRefreshing] = useState(false);
  const MessageButton = () => (
    <TouchableOpacity
      style={{ marginRight: 15 }}
      onPress={() => navigation.navigate("Messages")}
    >
      <Ionicons name="paper-plane-outline" size={30} />
    </TouchableOpacity>
  );
  useEffect(() => {
    navigation.setOptions({
      headerRight: MessageButton,
    });
  });
  return (
    <ScreenLayout loading={loading}>
      <FlatList
        onEndReachedThreshold={0.02}
        onEndReached={() =>
          fetchMore({
            variables: {
              offset: data?.seeFeed?.length,
            },
          })
        }
        refreshing={refreshing}
        onRefresh={refresh}
        style={{ width: "100%" }}
        data={data?.seeFeed}
        keyExtractor={(photo) => "" + photo.id}
        renderItem={renderPhoto}
      />
    </ScreenLayout>
  );
}
