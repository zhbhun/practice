
import React, { useCallback, useContext, useState } from "react";
import {
  Button,
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import {
  createDrawerNavigator,
  createAppContainer,
  createStackNavigator,
  DrawerItems,
} from "react-navigation";
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import Session from '../constants/Session';

const drawerHomeItems = [
  {
    key: 'all',
    routeName: 'Home',
    routeTitle: '全部',
    routeIcon: 'home'
  },
  {
    key: 'good',
    routeName: 'Home',
    routeTitle: '精华',
    routeIcon: 'heart',
  },
  {
    key: 'share',
    routeName: 'Home',
    routeTitle: '分享',
    routeIcon: 'share',
  },
  {
    key: 'ask',
    routeName: 'Home',
    routeTitle: '问答',
    routeIcon: 'help-buoy',
  },
  {
    key: 'job',
    routeName: 'Home',
    routeTitle: '招聘',
    routeIcon: 'briefcase',
  }
];

const drawserOtherItems = [
  ,
  {
    key: 'Message',
    routeName: 'Message',
    routeTitle: '消息',
    routeIcon: 'notifications',
  },
  {
    key: 'Setting',
    routeName: 'Setting',
    routeTitle: '设置',
    routeIcon: 'settings',
  },
  {
    key: 'About',
    routeName: 'About',
    routeTitle: '关于',
    routeIcon: 'information-circle',
  }
];

const renderIcon = ({ route, index, focused, tintColor }) => {
  return (
    <Ionicons
      name={`${Platform.OS === 'ios' ? 'ios-' : 'md-'}${route.routeIcon}`}
      size={24}
      color={tintColor}
    />
  );
};

const getLabel = ({ route, index, focused, tintColor }) => {
  return route.routeTitle;
};

const DrawerContentComponent = (props) => {
  const session = useContext(Session);
  const { navigation } = props;

  const [routeKey, setRouteKey] = useState('all');

  const handleHomeSwitch = useCallback(({ route }) => {
    setRouteKey(route.key);
    navigation.navigate(route.routeName, { tab: route.key });
    navigation.closeDrawer();
  }, []);

  const handleNavigate = useCallback(({ route }) => {
    navigation.navigate(route.routeName);
    navigation.closeDrawer();
  }, []);

  const { user } = session;

  return (
    <ScrollView
      alwaysBounceVertical={false}
      bounces={false}
      showsVerticalScrollIndicator={false}
    >
      <ImageBackground
        source={require('../assets/images/drawer_bg_user.png')}
        style={styles.header}
        resizeMode="cover"
      >
        <View style={styles.headerContent}>
          <TouchableWithoutFeedback
            onPress={() => {
              if (user) {
                navigation.push('User', { id: user.loginname });
              } else {
                navigation.navigate('Login');
              }
            }}
          >
            <View style={styles.headerUser}>
              <Image
                source={
                  user && user.avatar_url ?
                    { uri: user.avatar_url} :
                    require('../assets/images/image_placeholder.png')
                }
                style={styles.headerAvatar}
              />
              {
                user ?
                  <Text style={styles.headerTitle}>{user.loginname}</Text> :
                  <Text style={styles.headerTitle}>点击头像登录</Text>
              }
            </View>
          </TouchableWithoutFeedback>
          <View style={styles.headerActions}>
            <Text>...</Text>
            {user ? (
              <TouchableOpacity
                style={styles.logoutBtn}
                onPress={session.onLogout}
              >
                <Text style={styles.logoutText}>注销</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      </ImageBackground>
      <DrawerItems
        {...props}
        items={drawerHomeItems}
        activeItemKey={routeKey}
        renderIcon={renderIcon}
        getLabel={getLabel}
        onItemPress={handleHomeSwitch}
      />
      <View style={styles.divider} />
      <DrawerItems
        {...props}
        items={drawserOtherItems}
        activeItemKey={null}
        renderIcon={renderIcon}
        getLabel={getLabel}
        onItemPress={handleNavigate}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 166,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  headerAvatar: {
    marginBottom: 21,
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 26,
  },
  headerActions: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoutBtn: {
    marginTop: 45,
    height: 44,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  logoutText: {
    color: Colors.secondaryTextColor,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#fff',
  }
});

export default DrawerContentComponent;
