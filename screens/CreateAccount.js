import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import React, { useEffect } from "react";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";
import { TextInput } from "../components/auth/AuthShared";

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $firstName: String!
    $lastName: String
    $userName: String!
    $email: String!
    $password: String!
  ) {
    createAccount(
      firstName: $firstName
      lastName: $lastName
      userName: $userName
      email: $email
      password: $password
    ) {
      ok
      error
    }
  }
`;

export default function CreateAccount({ navigation }) {
  const { register, handleSubmit, setValue, getValues, watch } = useForm();
  const onCompleted = (data) => {
    const {
      createAccount: { ok, error },
    } = data;
    const { userName, password } = getValues();
    if (ok) {
      //simular to history.push("/Login");
      navigation.navigate("Login", {
        userName,
        password,
      });
    }
  };
  const [createAccountMutation, { loading }] = useMutation(
    CREATE_ACCOUNT_MUTATION,
    {
      onCompleted,
    }
  );
  const lastNameRef = useRef();
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const onNext = (nextOne) => {
    //nextOne is Ref name
    nextOne?.current?.focus();
  };
  const onValid = (data) => {
    if (!loading) {
      createAccountMutation({
        variables: {
          ...data,
        },
      });
    }
  };
  useEffect(() => {
    register("firstName", { required: true });
    register("lastName", { required: true });
    register("email", { required: true });
    register("userName", { required: true });
    register("password", { required: true });
  }, [register]);
  return (
    <AuthLayout>
      <TextInput
        placeholder="First Name"
        returnKeyType="next"
        onSubmitEditing={() => onNext(lastNameRef)}
        onChangeText={(text) => setValue("firstName", text)}
      />
      <TextInput
        ref={lastNameRef}
        placeholder="Last Name"
        returnKeyType="next"
        onSubmitEditing={() => onNext(usernameRef)}
        onChangeText={(text) => setValue("lastName", text)}
      />
      <TextInput
        ref={usernameRef}
        placeholder="Username"
        returnKeyType="next"
        onSubmitEditing={() => onNext(emailRef)}
        onChangeText={(text) => setValue("userName", text)}
      />
      <TextInput
        ref={emailRef}
        placeholder="Email"
        keyboardType="email-address"
        returnKeyType="next"
        onSubmitEditing={() => onNext(passwordRef)}
        onChangeText={(text) => setValue("email", text)}
      />
      <TextInput
        ref={passwordRef}
        placeholder="Password"
        secureTextEntry
        returnKeyType="done"
        onSubmitEditing={handleSubmit(onValid)}
        lastOne={true}
        onChangeText={(text) => setValue("password", text)}
      />
      <AuthButton
        text="Create Account"
        disabled={
          !watch("userName") ||
          !watch("password") ||
          !watch("firstName") ||
          !watch("lastName") ||
          !watch("email")
        }
        onPress={handleSubmit(onValid)}
      />
    </AuthLayout>
  );
}
