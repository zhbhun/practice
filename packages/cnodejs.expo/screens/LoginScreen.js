import React, { useCallback, useContext, useState } from 'react';
import {
  Image,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';
import Toast from 'react-native-root-toast';
import Colors from '../constants/Colors';
import * as apis from '../services/apis';
import Session from '../constants/Session';

function SettingsScreen({ navigation }) {
  const session = useContext(Session);
  const [accessToken, setAccessToken] = useState('');
  const [submiting, setSubmitting] = useState(false);
  const handleAccessTokenChange = useCallback(value => {
    setAccessToken(value);
  });
  const submit = useCallback(() => {
    setSubmitting(true);
    apis.login(accessToken)
      .then(data => {
        setSubmitting(false);
        session.onLogin(data);
        navigation.pop();
      })
      .catch(() => {
        setSubmitting(false);
        Toast.show('Access Token 错误');
      })
  }, [accessToken]);
  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode="stretch"
        source={require('../assets/images/login_bg_header.png')}
        style={styles.banner}
      >
        <View style={styles.logo}>
          <Image
            source={require('../assets/images/logo.png')}
            style={styles.logoImage}
          />
          <Text style={styles.logoText}>cnodejs.org</Text>
        </View>
      </ImageBackground>
      <View style={styles.contentContainer}>
        <TextInput
          allowFontScaling={false}
          autoCapitalize="none"
          autoCorrect={false}
          autoFocus={false}
          caretHidden={false}
          dataDetectorTypes="none"
          editable
          keyboardType="default"
          placeholder="Access Token："
          returnKeyType="done"
          selectionColor={Colors.accentColor}
          underlineColorAndroid={Colors.accentColor}
          style={styles.input}
          value={accessToken}
          onChangeText={handleAccessTokenChange}
        />
        <TouchableHighlight
          disabled={!(accessToken && accessToken.length > 0)}
          onPress={submit}
          style={[styles.submit, {
            backgroundColor: !(accessToken && accessToken.length > 0) || submiting ? '#c8e6c9' : Colors.accentColor
          }]}
          underlayColor="#388e3c"
        >
          <Text style={styles.submitText}>
            {submiting ? '登录中...' : '登录'}
          </Text>
        </TouchableHighlight>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
  banner: {
    height: 200,
    justifyContent: 'center',
    alignContent: 'center',
  },
  logo: {
    alignItems: 'center',
  },
  logoImage: {
    marginBottom: 5,
    width: 160,
    height: 40,
  },
  logoText: {
    color: '#fff',
  },
  contentContainer: {
    position: 'absolute',
    top: 160,
    left: 16,
    right: 16,
    height: 200,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    borderRadius: 2,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    justifyContent: 'center',
  },
  input: {
    marginBottom: 20,
    paddingVertical: 6,
    ...Platform.select({
      ios: {
        borderBottomColor: Colors.accentColor,
        borderBottomWidth: 1,
      },
    }),
  },
  submit: {
    height: 44,
    backgroundColor: Colors.accentColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitText: {
    color: '#fff',
  },
});

SettingsScreen.navigationOptions = {
  title: '登录',
  headerTintColor: '#fff',
  headerTransparent: true,
};

export default SettingsScreen;
