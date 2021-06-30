import React from "react";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import useMe from "../../hooks/useMe";
import { color } from "../../color";
import { useNavigation } from "@react-navigation/core";

const RoomContainer = styled.TouchableOpacity`
  padding: 15px 10px;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

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

export default function RoomItem({ users, unreadTotal, id }) {
  const { data: meData } = useMe();
  const navigation = useNavigation();
  const talkingTo = users.find(
    (user) => user.userName !== meData?.me?.userName
  );
  const goToRoom = () =>
    navigation.navigate("Room", {
      id,
      talkingTo,
    });
  return (
    <RoomContainer onPress={goToRoom}>
      <Column>
        {talkingTo.avatar ? (
          <Avatar source={{ uri: talkingTo.avatar }} />
        ) : (
          <Ionicons name={"person"} size={50} />
        )}
        <Data>
          <Username>{talkingTo.userName}</Username>
          <UnreadText>
            {unreadTotal} unread {unreadTotal === 1 ? "message" : "messages"}
          </UnreadText>
        </Data>
      </Column>
      <Column>{unreadTotal !== 0 ? <UnreadDot /> : null}</Column>
    </RoomContainer>
  );
}
