import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { color } from "../color";
import Login from "./Login";

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: white;
`;

const Logo = styled.Image`
  max-width: 50%;
  height: 100px;
`;

const CreateAccount = styled.View`
  background-color: ${color.blue};
  padding: 7px 10px;
  border-radius: 7px;
`;

const CreateAccountText = styled.Text`
  color: white;
  font-weight: 600;
  font-size: 16px;
`;

const LoginLink = styled.Text`
  color: ${color.blue};
  font-weight: 600;
  margin-top: 10px;
`;

export default function Welcome({ navigation }) {
  const goToCreateAccount = () => navigation.navigate("CreateAccount");
  const goToLogin = () => navigation.navigate("Login");
  return (
    <Container>
      <Logo resizeMode="center" source={require("../assets/insta.png")} />
      <TouchableOpacity onPress={goToCreateAccount}>
        <CreateAccount>
          <CreateAccountText>Create Account</CreateAccountText>
        </CreateAccount>
      </TouchableOpacity>
      <TouchableOpacity onPress={goToLogin}>
        <LoginLink>Login</LoginLink>
      </TouchableOpacity>
    </Container>
  );
}
