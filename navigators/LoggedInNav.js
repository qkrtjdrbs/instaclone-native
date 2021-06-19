import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabIcon from "../components/nav/TabIcon";
import StackNavFactory from "../navigators/StackNavFactory";
import useMe from "../hooks/useMe";
import { Image } from "react-native";

const Tabs = createBottomTabNavigator();

export default function LoggedInNav() {
  const { data } = useMe();
  return (
    <Tabs.Navigator
      tabBarOptions={{
        style: {
          borderTopColor: "rgba(255, 255, 255, 0.5)",
        },
        showLabel: false,
      }}
    >
      <Tabs.Screen
        name="Feed"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon iconName={"home"} focused={focused} />
          ),
        }}
      >
        {() => <StackNavFactory screenName="Feed" />}
      </Tabs.Screen>
      <Tabs.Screen
        name="Search"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon iconName={"search"} focused={focused} />
          ),
        }}
      >
        {() => <StackNavFactory screenName="Search" />}
      </Tabs.Screen>
      <Tabs.Screen
        name="Camera"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon iconName={"add-circle"} focused={focused} />
          ),
        }}
      >
        {() => <StackNavFactory screenName="Camera" />}
      </Tabs.Screen>
      <Tabs.Screen
        name="Notification"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon iconName={"heart"} focused={focused} />
          ),
        }}
      >
        {() => <StackNavFactory screenName="Notification" />}
      </Tabs.Screen>
      <Tabs.Screen
        name="Me"
        options={{
          tabBarIcon: ({ focused }) =>
            data?.me?.avatar ? (
              <Image
                source={{ uri: data.me.avatar }}
                style={{
                  height: 25,
                  width: 25,
                  borderRadius: 12.5,
                  ...(focused && { borderColor: "black", borderWidth: 1 }),
                }}
              />
            ) : (
              <TabIcon iconName={"person"} focused={focused} />
            ),
        }}
      >
        {() => <StackNavFactory screenName="Me" />}
      </Tabs.Screen>
    </Tabs.Navigator>
  );
}
