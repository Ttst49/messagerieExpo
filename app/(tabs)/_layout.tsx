import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {Tabs} from 'expo-router';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import {GlobalConstants} from "@/app/common/Global-constants";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}>
        <Tabs.Screen
            name={"home"}
            options={{
                title: 'home',
                tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color}
                />,
            }}
        />
        <Tabs.Screen
            name={"channel"}
            options={{
                headerShown: false,
                tabBarLabel: "channels",
                href: (GlobalConstants.isLoggedIn())? "/channel" : null  }}
        />
        <Tabs.Screen
            name="group"
            options={{
                headerShown: false,
                href: (GlobalConstants.isLoggedIn())? "/group" : null  }}
        />
        <Tabs.Screen
            name="profile"
            options={{
                headerShown: false,
                tabBarLabel: (GlobalConstants.isLoggedIn()? "profile": "login"),
                href: (GlobalConstants.isLoggedIn())? "/profile" : "/login"  }}
        />

    </Tabs>
  );
}
