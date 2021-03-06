import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { color } from "../color";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";

const LoginLink = styled.Text`
  color: ${color.blue};
  font-weight: 600;
  margin-top: 20px;
`;

export default function Welcome({ navigation }) {
  const goToCreateAccount = () => navigation.navigate("CreateAccount");
  const goToLogin = () => navigation.navigate("Login");
  return (
    <AuthLayout>
      <AuthButton
        text="Create New Account"
        disabled={false}
        onPress={goToCreateAccount}
      />
      <TouchableOpacity onPress={goToLogin}>
        <LoginLink>Login</LoginLink>
      </TouchableOpacity>
    </AuthLayout>
  );
}
