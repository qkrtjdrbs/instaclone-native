import React, { useEffect } from "react";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";
import { TextInput } from "../components/auth/AuthShared";
import { gql, useMutation } from "@apollo/client";
import { logUserIn } from "../apollo";

const LOGIN_MUTATION = gql`
  mutation login($userName: String!, $password: String!) {
    login(userName: $userName, password: $password) {
      ok
      token
      error
    }
  }
`;

export default function Login({ route: { params } }) {
  //simular to lacation.state.userName, password
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      userName: params?.userName,
      password: params?.password,
    },
  });
  const passwordRef = useRef();
  const onCompleted = async (data) => {
    const {
      login: { ok, token, error },
    } = data;
    if (ok) {
      await logUserIn(token);
    } else {
      setError("result", error);
    }
  };
  const [loginMutation, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted,
  });
  const onNext = (nextOne) => {
    //nextOne is Ref name
    nextOne?.current?.focus();
  };
  const onValid = (data) => {
    if (!loading) {
      loginMutation({ variables: { ...data } });
    }
  };
  useEffect(() => {
    register("userName", { required: true });
    register("password", { required: true });
  }, [register]);
  return (
    <AuthLayout>
      {errors?.result?.message}
      <TextInput
        value={watch("userName")}
        placeholder="Username"
        returnKeyType="next"
        onSubmitEditing={() => onNext(passwordRef)}
        onChangeText={(text) => setValue("userName", text)}
      ></TextInput>
      <TextInput
        value={watch("password")}
        ref={passwordRef}
        placeholder="Password"
        secureTextEntry
        returnKeyType="done"
        lastOne={true}
        onSubmitEditing={handleSubmit(onValid)}
        onChangeText={(text) => setValue("password", text)}
      ></TextInput>
      <AuthButton
        text="Log in"
        loading={loading}
        disabled={!watch("userName") || !watch("password")}
        onPress={handleSubmit(onValid)}
      />
    </AuthLayout>
  );
}
