import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import FlashMessage from 'react-native-flash-message';
import MainAppStack from './src/navigation/MainAppStack';
import { Provider } from 'react-redux';
import { store } from './src/store';
import AuthListener from './src/components/providers/AuthListener';
import "./src/i18n";
export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <AuthListener>
            <MainAppStack />
          </AuthListener>
          <FlashMessage position="top" />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}

