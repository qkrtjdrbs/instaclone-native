import React from "react";
import { Text, View } from "react-native";
import styled from "styled-components";
import { logUserOut } from "../apollo";
import AuthButton from "../components/auth/AuthButton";

export default function Me() {
  return (
    <View>
      <Text>Me</Text>
      <AuthButton text="Log out" onPress={logUserOut} disabled={false} />
    </View>
  );
}
