import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";

import Colors from "~/constants/Colors";
import { useColorScheme } from "~/components/useColorScheme";
import { useClientOnlyValue } from "~/components/useClientOnlyValue";
import { router } from "expo-router";
import { TabController, View } from "react-native-ui-lib";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Location",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="location-arrow" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="carInfo"
        options={{
          title: "Car Info",
          tabBarIcon: ({ color }) => <TabBarIcon name="car" color={color} />,
        }}
      />
    </Tabs>
  );
}
