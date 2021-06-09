import AppLoading from "expo-app-loading";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import LoggedOutNav from "./navigators/LoggedOutNav";
import { NavigationContainer } from "@react-navigation/native";
import { Appearance, AppearanceProvider } from "react-native-appearance";

export default function App() {
  const [loading, setLoading] = useState(true);
  const onFinish = () => setLoading(false);
  const preload = () => {
    const fontToLoad = [Ionicons.font];
    const fontPromises = fontToLoad.map((font) => Font.loadAsync(font));
    const imagesToLoad = [require("./assets/insta.png")];
    const imagePromises = imagesToLoad.map((image) => Asset.loadAsync(image));
    return Promise.all([...fontPromises, ...imagePromises]);
  };
  if (loading) {
    return (
      <AppLoading
        startAsync={preload}
        onError={console.warn}
        onFinish={onFinish}
      />
    );
  }
  const subscription = Appearance.addChangeListener(({ colorScheme }) =>
    console.log(colorScheme)
  );
  return (
    <NavigationContainer>
      <LoggedOutNav />
    </NavigationContainer>
  );
}
