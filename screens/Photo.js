import { useMutation, useQuery } from "@apollo/client";
import gql from "graphql-tag";
import React, { useState } from "react";
import { View, RefreshControl } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import styled from "styled-components";
import Photo from "../components/Photo";
import ScreenLayout from "../components/ScreenLayout";
import { PHOTO_FRAGMENT } from "../fragment";

const SEE_PHOTO = gql`
  query seePhoto($id: Int!) {
    seePhoto(id: $id) {
      ...PhotoFragment
      user {
        id
        userName
        avatar
      }
      caption
    }
  }
  ${PHOTO_FRAGMENT}
`;

export default function PhotoScreen({ route }) {
  const { data, loading, refetch } = useQuery(SEE_PHOTO, {
    variables: {
      id: route?.params?.photoId,
    },
  });
  const [refreshing, setRefreshing] = useState();
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  return (
    <ScreenLayout loading={loading}>
      <ScrollView
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
        }
        contentContainerStyle={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Photo {...data?.seePhoto} />
      </ScrollView>
    </ScreenLayout>
  );
}
