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
            name={"index"}
            options={{
                title: 'home',
                tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color}
                />,
            }}
        />
        <Tabs.Screen
            name={"channel"}
            options={{
                title: "channels",
                tabBarIcon: ({color})=><TabBarIcon name={"wechat"} color={color}/>,
                href: (GlobalConstants.isLoggedIn())? "/channel" : null  }}
        />
        <Tabs.Screen
            name="group"
            options={{
                title: "groups",
                tabBarIcon: ({color})=><TabBarIcon name={"users"} color={color}/>,
                href: (GlobalConstants.isLoggedIn())? "/group" : null  }}
        />
        <Tabs.Screen
            name="profile"
            options={{
                title: "profile",
                tabBarIcon: ({color})=><TabBarIcon name={"user-circle"} color={color}/>,
                href: (GlobalConstants.isLoggedIn())? "/profile" : "/login"  }}
        />

    </Tabs>
  );
}
