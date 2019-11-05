import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import React, { useCallback, useState } from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import AppNavigator from './navigation/AppNavigator';
import Session from './constants/Session';
import * as apis from './services/apis';

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const [user, setUser] = useState(null);

  const initiate = useCallback(() => {
    apis.getAccessToken()
      .then(async accessToken => {
        if (accessToken) {
          try {
            const data = await apis.login(accessToken);
            setUser(data);
          } catch (error) {
            await apis.setAccessToken('');
          }
        }
      });
    return loadResourcesAsync();
  }, []);
  const handleLogin = useCallback((data) => {
    setUser(data);
  }, []);
  const handleLogout = useCallback((data) => {
    setUser(null);
  }, []);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={initiate}
        onError={handleLoadingError}
        onFinish={() => setLoadingComplete(true)}
      />
    );
  } else {
    return (
      <Session.Provider
        value={{
          user,
          onLogin: handleLogin,
          onLogout: handleLogout,
        }}
      >
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <AppNavigator />
        </View>
      </Session.Provider>
    );
  }
}

async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync([
      require('./assets/images/robot-dev.png'),
      require('./assets/images/robot-prod.png'),
    ]),
    Font.loadAsync({
      // This is the font that we are using for our tab bar
      ...Ionicons.font,
      // We include SpaceMono because we use it in HomeScreen.js. Feel free to
      // remove this if you are not using it in your app
      'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
    }),
  ]);
}

function handleLoadingError(error: Error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
