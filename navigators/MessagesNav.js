import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Room from "../screens/Room";
import Rooms from "../screens/Rooms";
import { Ionicons } from "@expo/vector-icons";

const Stack = createStackNavigator();

export default function MessagesNav() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen
        name="Rooms"
        options={{
          headerBackImage: ({ tintColor }) => (
            <Ionicons color={tintColor} name="chevron-back" size={28} />
          ),
        }}
        component={Rooms}
      />
      <Stack.Screen
        name="Room"
        options={{
          headerBackImage: ({ tintColor }) => (
            <Ionicons color={tintColor} name="chevron-back" size={28} />
          ),
        }}
        component={Room}
      />
    </Stack.Navigator>
  );
}
