
import {
  createAppContainer,
  createDrawerNavigator,
  createStackNavigator,
} from "react-navigation";
import DrawerContentComponent from '../components/DrawerContentComponent';
import AboutScreen from '../screens/AboutScreen';
import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';
import MessageScreen from '../screens/MessageScreen';
import SettingScreen from '../screens/SettingScreen';
import UserScreen from '../screens/UserScreen';
import LoginScreen from '../screens/LoginScreen';

const MainNavigator = createDrawerNavigator({
  Main: createStackNavigator({
    Home: HomeScreen,
    Detail: DetailScreen,
    User: UserScreen,
  }, {
    initialRouteName: 'Home',
  }),
}, {
  contentComponent: DrawerContentComponent,
});

MainNavigator.navigationOptions = {
  header: null,
};

const AppNavigator = createStackNavigator({
  Main: MainNavigator,
  Message: MessageScreen,
  Setting: SettingScreen,
  About: AboutScreen,
  Login: LoginScreen,
}, {
  initialRouteName: 'Main'
});


export default createAppContainer(AppNavigator);
