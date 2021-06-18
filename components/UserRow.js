import React from "react";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components";
import { color } from "../color";

const Column = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;
const Avatar = styled.Image`
  width: 35px;
  height: 35px;
  border-radius: 17px;
  margin-right: 7px;
`;
const Username = styled.Text`
  font-weight: 700;
`;
const Wrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 5px 10px;
`;
const FollowBtn = styled.TouchableOpacity`
  background-color: ${color.blue};
  justify-content: center;
  align-items: center;
  padding: 5px 10px;
  border-radius: 4px;
`;
const FollowBtnText = styled.Text`
  color: white;
  font-weight: 700;
`;

export default function UserRow({ id, avatar, userName, isFollowing, isMe }) {
  const navigation = useNavigation();
  return (
    <Wrapper>
      <Column
        onPress={() =>
          navigation.navigate("Profile", {
            userName,
            id,
          })
        }
      >
        <Avatar source={{ uri: avatar }} />
        <Username>{userName}</Username>
      </Column>
      {!isMe ? (
        <FollowBtn>
          <FollowBtnText>{isFollowing ? "Unfollow" : "Follow"}</FollowBtnText>
        </FollowBtn>
      ) : null}
    </Wrapper>
  );
}
