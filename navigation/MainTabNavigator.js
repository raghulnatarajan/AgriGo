import React from "react";
import { Platform, TouchableOpacity, View } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator,
  createDrawerNavigator
} from "react-navigation";
import Icon from "react-native-vector-icons/Ionicons";
import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import LoadingScreen from "../screens/LoadingScreen";
import { createSwitchNavigator } from "react-navigation";
import WelcomeScreen from "../screens/WelcomeScreen";
import SignUpScreen from "../screens/SignUpScreen";
import SignInScreen from "../screens/SignInScreen";
import ShareScreen from "../screens/ShareScreen";
import Profile from "../screens/Profile";
import ViewScreen from "../screens/ViewRequest";

const profileScreen = createStackNavigator({
  Profile: Profile
});
const ViewNavigator = createStackNavigator({
  ShareScreen: ShareScreen,
  ViewScreen: ViewScreen
});

const AppTabNavigator = createBottomTabNavigator(
  {
    HomeScreen: {
      screen: HomeScreen,
      //Nav options for Home
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => {
          return (
            <Icon color={tintColor} size={24} name="ios-information-circle" />
          );
        }
      }
    },
    Share: {
      screen: ShareScreen
    },
    Profile: {
      screen: Profile
    }
  },
  //options
  { initialRouteName: "HomeScreen", activeTintColor: "yellow" }
);

const AppStackNavigator = createStackNavigator({
  AppTabNavigator: {
    screen: AppTabNavigator,

    navigationOptions: ({ navigation }) => ({
      title: "AgriGo",
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <View style={{ paddingHorizontal: 10 }}>
            <Icon name="md-menu" size={24} />
          </View>
        </TouchableOpacity>
      )
    })
  },
  ViewScreen: {
    screen: ViewScreen
  }
});

const AppDrawerNavigator = createDrawerNavigator({
  Home: AppStackNavigator
});

const AuthStackNavigator = createStackNavigator({
  Welcome: WelcomeScreen,
  SignIn: SignInScreen,
  SignUp: SignUpScreen
});

export default createSwitchNavigator({
  AuthLoader: LoadingScreen,
  Auth: AuthStackNavigator,
  Profile: profileScreen,
  App: AppDrawerNavigator
});
