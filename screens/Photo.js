import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components";

export default function Photo({ navigation }) {
  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
        <Text>Profile</Text>
      </TouchableOpacity>
    </View>
  );
}
