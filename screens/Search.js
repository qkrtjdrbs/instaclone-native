import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components";

export default function Search({ navigation }) {
  return (
    <View>
      <Text>Search</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Photo")}>
        <Text>Photo</Text>
      </TouchableOpacity>
    </View>
  );
}
