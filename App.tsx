import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import FlashMessage from 'react-native-flash-message';
import { Provider } from 'react-redux';
import { store } from './src/store';
import AuthListener from './src/components/providers/AuthListener';
import MainAppStack from './src/navigation/MainAppStack';
import { I18nextProvider } from 'react-i18next';
import i18n from './src/i18n/i18n';

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <I18nextProvider i18n={i18n}>
          <NavigationContainer>
            <AuthListener>
              <MainAppStack />
            </AuthListener>
            <FlashMessage position="top" />
          </NavigationContainer>
        </I18nextProvider>
      </SafeAreaProvider>
    </Provider>
  );
}
