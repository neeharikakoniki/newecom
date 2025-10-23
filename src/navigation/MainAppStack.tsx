
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AuthStack from "./AuthStack";
import MainAppBottomTabs from "./MainAppBottomTabs";
import { useAppSelector } from "../store";
import { View, ActivityIndicator } from "react-native";

export type RootStackParamList = {
  AuthStack: undefined;
  MainAppBottomTabs: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function MainAppStack() {
  const { user, initialized } = useAppSelector((s) => s.auth);

  if (!initialized) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <Stack.Screen name="MainAppBottomTabs" component={MainAppBottomTabs} />
      ) : (
        <Stack.Screen name="AuthStack" component={AuthStack} />
      )}
    </Stack.Navigator>
  );
}
