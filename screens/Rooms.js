import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import React from "react";
import { View, Text, FlatList, Image } from "react-native";
import { ROOM_FRAGMENT } from "../fragment";
import ScreenLayout from "../components/ScreenLayout";
import RoomItem from "../components/rooms/RoomItem";

const SEE_ROOMS_QUERY = gql`
  query seeRooms {
    seeRooms {
      ...RoomParts
    }
  }
  ${ROOM_FRAGMENT}
`;

export default function Rooms() {
  const { data, loading } = useQuery(SEE_ROOMS_QUERY);
  const renderItem = ({ item: room }) => <RoomItem {...room} />;
  return (
    <ScreenLayout loading={loading}>
      <FlatList
        ItemSeparatorComponent={(item) => (
          <View
            key={item?.id}
            style={{
              width: "100%",
              height: 1,
              backgroundColor: "rgba(0, 0, 0, 0.1)",
            }}
          ></View>
        )}
        style={{ width: "100%" }}
        data={data?.seeRooms}
        keyExtractor={(room) => "" + room.id}
        renderItem={renderItem}
      />
    </ScreenLayout>
  );
}
