import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import React from "react";
import { View, Text, FlatList, Image } from "react-native";
import { ROOM_FRAGMENT } from "../fragment";
import styled from "styled-components/native";
import ScreenLayout from "../components/ScreenLayout";
import useMe from "../hooks/useMe";
import { Ionicons } from "@expo/vector-icons";
import { color } from "../color";

const SEE_ROOMS_QUERY = gql`
  query seeRooms {
    seeRooms {
      ...RoomParts
    }
  }
  ${ROOM_FRAGMENT}
`;

const RoomContainer = styled.TouchableOpacity`
  padding: 15px 10px;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const RoomText = styled.Text``;

const Column = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const Avatar = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
`;
const Data = styled.View`
  margin-left: 20px;
`;
const UnreadDot = styled.View`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: ${color.blue};
`;
const Username = styled.Text`
  font-weight: 700;
  font-size: 16px;
`;
const UnreadText = styled.Text`
  margin-top: 2px;
  font-weight: 500;
`;

export default function Rooms() {
  const { data, loading } = useQuery(SEE_ROOMS_QUERY);
  const { data: meData } = useMe();
  const renderItem = ({ item: room }) => {
    //Return First Name Not Me
    const notMe = room.users.find(
      (user) => user.userName !== meData?.me?.userName
    );
    return (
      <RoomContainer>
        <Column>
          {notMe.avatar ? (
            <Avatar source={{ uri: notMe.avatar }} />
          ) : (
            <Ionicons name={"person"} size={50} />
          )}
          <Data>
            <Username>{notMe.userName}</Username>
            <UnreadText>
              {room.unreadTotal} unread{" "}
              {room.unreadTotal === 1 ? "message" : "messages"}
            </UnreadText>
          </Data>
        </Column>
        <Column>{room.unreadTotal !== 0 ? <UnreadDot /> : null}</Column>
      </RoomContainer>
    );
  };
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
