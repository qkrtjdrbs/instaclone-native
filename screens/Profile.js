import React, { useEffect } from "react";
import { Text, View } from "react-native";
import styled from "styled-components";

export default function Profile({ navigation, route }) {
  useEffect(() => {
    if (route?.params?.userName) {
      navigation.setOptions({
        title: route.params.userName,
      });
    }
  }, []);
  return (
    <View>
      <Text>Someone's Profile</Text>
    </View>
  );
}
