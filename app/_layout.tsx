import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/SimpleLineIcons";

import MainScreen from "@/app/src/screens/MainScreen";
import ShortsScreen from "@/app/src/screens/ShortsScreen";
import {Video} from "@/app/src/components/Video";
import {Watch} from "@/app/src/components/Watch";
import {Search} from "@/app/src/components/search";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="MainScreen" component={MainScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Video" component={Video} options={{ title: "Video" }} />
            <Stack.Screen name="Watch" component={Watch} options={{ title: "Watch", headerLeft: ()=> null, headerShown: false }} />
            <Stack.Screen name="Shorts" component={ShortsScreen} options={{ title: "Shorts", headerShown: false}} />
            <Stack.Screen name="Search" component={Search} options={{ title: "Watch", headerLeft: ()=> null, headerShown: false }} />
        </Stack.Navigator>
    );
}

export default function RootLayout() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: "red",
                tabBarInactiveTintColor: "#ffffff",
                tabBarStyle: {
                    backgroundColor: "#252525",
                    borderTopColor: "transparent",
                },
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeStack}
                options={{
                    headerShown: false,
                    title: "Home",
                    tabBarIcon: ({ color }) => <Icon name="home" size={24} color={color} />,
                }}
            />
            <Tab.Screen
                name="Shorts"
                component={ShortsScreen}
                options={{
                    headerShown: false,
                    title: "Shorts",
                    tabBarIcon: ({ color }) => <Icon name="compass" size={24} color={color} />,
                }}
            />
        </Tab.Navigator>
    );
}
