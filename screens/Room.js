import { useMutation, useQuery, gql } from "@apollo/client";
import React, { useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import ScreenLayout from "../components/ScreenLayout";
import styled from "styled-components/native";
import { color } from "../color";
import { useForm } from "react-hook-form";
import useMe from "../hooks/useMe";
import { Ionicons } from "@expo/vector-icons";

const SEND_MESSAGE_MUTATION = gql`
  mutation sendMessage($payload: String!, $roomId: Int, $userId: Int) {
    sendMessage(payload: $payload, roomId: $roomId, userId: $userId) {
      ok
      id
    }
  }
`;

const ROOM_QUERY = gql`
  query seeRoom($id: Int!) {
    seeRoom(id: $id) {
      id
      messages {
        id
        payload
        user {
          userName
          avatar
        }
        read
      }
    }
  }
`;

const MessageContainer = styled.View`
  padding: 0px 10px;
  flex-direction: ${(props) => (props.outGoing ? "row-reverse" : "row")};
  align-items: center;
`;
const Author = styled.View``;
const Avatar = styled.Image`
  height: 35px;
  width: 35px;
  border-radius: 25px;
`;
const Message = styled.Text`
  color: ${(props) => (props.outGoing ? "white" : "black")};
  background-color: ${(props) => (props.outGoing ? "#377EF0" : "#eaeaea")};
  padding: 5px 10px;
  border-radius: 10px;
  font-size: 16px;
  margin: 0px 10px;
`;
const TextInput = styled.TextInput`
  padding: 10px 20px;
  width: 90%;
  margin-right: 10px;
`;

const InputContainer = styled.View`
  width: 95%;
  margin-top: 25px;
  flex-direction: row;
  align-items: center;
`;

const SendButton = styled.TouchableOpacity``;

export default function Room({ route, navigation }) {
  const { data: meData } = useMe();
  const updateSendMessage = (cache, result) => {
    const {
      data: {
        sendMessage: { ok, id },
      },
    } = result;
    if (ok && meData) {
      const { message } = getValues();
      setValue("message", "");
      //fake message obj
      const messageObj = {
        id,
        payload: message,
        user: {
          userName: meData.me.userName,
          avatar: meData.me.avatar,
        },
        read: true,
        __typename: "Message",
      };
      //make a new message fragment
      const messageFragment = cache.writeFragment({
        fragment: gql`
          fragment NewMessage on Message {
            id
            payload
            user {
              userName
              avatar
            }
            read
          }
        `,
        data: messageObj,
      });
      //Putting a new message in the cache
      cache.modify({
        id: `Room:${route.params.id}`,
        fields: {
          messages(prev) {
            return [...prev, messageFragment];
          },
        },
      });
    }
  };
  const [sendMessageMutation, { loading: sendingMessage }] = useMutation(
    SEND_MESSAGE_MUTATION,
    {
      update: updateSendMessage,
    }
  );
  const { register, handleSubmit, setValue, getValues, watch } = useForm();
  const { data, loading } = useQuery(ROOM_QUERY, {
    variables: {
      id: route?.params?.id,
    },
  });
  const onValid = ({ message }) => {
    if (!sendingMessage) {
      sendMessageMutation({
        variables: {
          payload: message,
          roomId: route?.params?.id,
        },
      });
    }
  };
  useEffect(() => {
    navigation.setOptions({
      title: `${route?.params?.talkingTo?.userName}`,
    });
  }, []);
  useEffect(() => {
    register("message", { required: true });
  }, [register]);
  const renderItem = ({ item: message }) => (
    <MessageContainer
      outGoing={message.user.userName !== route?.params?.talkingTo?.userName}
    >
      <Author>
        <Avatar source={{ uri: message.user.avatar }} />
      </Author>
      <Message
        outGoing={message.user.userName !== route?.params?.talkingTo?.userName}
      >
        {message.payload}
      </Message>
    </MessageContainer>
  );
  //To keep the latest message down
  const messages = [...(data?.seeRoom?.messages ?? [])];
  messages.reverse();
  return (
    <ScreenLayout loading={loading}>
      <FlatList
        inverted
        style={{ width: "100%", marginVertical: 10 }}
        ItemSeparatorComponent={() => <View style={{ height: 15 }}></View>}
        data={messages}
        showsVerticalScrollIndicator={false}
        keyExtractor={(message) => "" + message.id}
        renderItem={renderItem}
      />
      <InputContainer>
        <TextInput
          placeholder="Write a message"
          returnKeyLabel="Send"
          returnKeyType="send"
          onChangeText={(text) => setValue("message", text)}
          onSubmitEditing={handleSubmit(onValid)}
          value={watch("message")}
        />
        <SendButton
          onPress={handleSubmit(onValid)}
          disabled={!Boolean(watch("message"))}
        >
          <Ionicons
            name="send"
            size={22}
            color={
              !Boolean(watch("message"))
                ? "rgba(255, 255, 255, 0.5)"
                : `${color.blue}`
            }
          />
        </SendButton>
      </InputContainer>
    </ScreenLayout>
  );
}
