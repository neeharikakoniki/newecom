import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";
import FlashMessage from "react-native-flash-message";
import { Provider } from "react-redux";
import { store, useAppSelector } from "./src/store";
import AuthListener from "./src/components/providers/AuthListener";
import MainAppStack from "./src/navigation/MainAppStack";
import { I18nextProvider } from "react-i18next";
import i18n from "./src/i18n/i18n";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Alert, Platform } from "react-native";
import NetworkListener from "./src/components/providers/NetworkListener";
import OfflineBanner from "./src/components/common/OfflineBanner";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});


const FlashMessageWithOffset = () => {
  const insets = useSafeAreaInsets();
  const { isConnected, bannerHeight } = useAppSelector((s) => s.network);

  const offset = isConnected ? insets.top : insets.top + bannerHeight;

  return <FlashMessage position="top" statusBarHeight={offset} />;
};

export default function App() {
  useEffect(() => {
    async function registerForPushNotificationsAsync() {
      if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        if (existingStatus !== "granted") {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }

        if (finalStatus !== "granted") {
          Alert.alert(
            "Permission required",
            "Please enable notifications for the best experience."
          );
          return;
        }
      } else {
        console.log("Must use physical device for notifications");
      }

      if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: "#FF231F7C",
        });
      }
    }

    registerForPushNotificationsAsync();
  }, []);

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <I18nextProvider i18n={i18n}>
          <NavigationContainer>
            <NetworkListener>
              <OfflineBanner />
              <AuthListener>
                <MainAppStack />
              </AuthListener>
              <FlashMessageWithOffset /> 
            </NetworkListener>
          </NavigationContainer>
        </I18nextProvider>
      </SafeAreaProvider>
    </Provider>
  );
}
