import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/home/HomeScreen";
import CartScreen from "../screens/cart/CartScreen";
import ProfileScreen from "../screens/profiles/ProfileScreen";
import { AppColors } from "../styles/colors";
import { s, vs } from "react-native-size-matters";
import { Ionicons } from "@expo/vector-icons";
import { IS_Android } from "../constants/constants";


import { useAppSelector } from "../store";
import { selectTotalItems } from "../store/slices/cartSlice";

export type TabsParamList = {
  Home: undefined;
  Cart: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<TabsParamList>();

export default function MainAppBottomTabs() {
  const total = useAppSelector(selectTotalItems);
  const badge = total > 99 ? "99+" : total > 0 ? total : undefined;

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: AppColors?.primary ?? "#2C5E1A",
        tabBarLabelStyle: { marginTop: vs(4), fontSize: s(12) },
        tabBarStyle: IS_Android ? { height: vs(50) } : undefined,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
        }}
      />

      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          title: "Cart",
          tabBarIcon: ({ color, size }) => <Ionicons name="cart" size={size} color={color} />,
          tabBarBadge: badge,
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => <Ionicons name="person" size={size} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}
