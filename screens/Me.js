import React, { useEffect } from "react";
import { Text, View } from "react-native";
import styled from "styled-components";
import { logUserOut } from "../apollo";
import AuthButton from "../components/auth/AuthButton";
import useMe from "../hooks/useMe";

export default function Me({ navigation }) {
  const { data } = useMe();
  useEffect(() => {
    navigation.setOptions({
      title: data?.me?.userName,
    });
  });
  return (
    <View>
      <Text>Me</Text>
      <AuthButton text="Log out" onPress={logUserOut} disabled={false} />
    </View>
  );
}
