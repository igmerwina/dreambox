import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createBottomTabNavigator } from "react-navigation";
import {
  HomeNavigator,
  ProfileNavigator,
  SearchNavigator,
  ListDreamboxNav
} from "./screen-stack-navigators";

const getTabBarIcon = (navigation, focused, tintColor) => {
  const { routeName } = navigation.state;
  let IconComponent = Ionicons;
  let iconName;
  if (routeName === "Home") {
    iconName = "ios-home";
  } else if (routeName === "Notifikasi") {
    iconName = "ios-notifications";
  } else if (routeName === "Profile") {
    iconName = "ios-contact";
  } 

  return <IconComponent name={iconName} size={25} color={tintColor} />;
};

const BottomTabNavigator = createBottomTabNavigator(
  // cuman 3 ini aja bener, tapi....
  {
    Home: HomeNavigator,
    Notifikasi: SearchNavigator,
    Profile: ProfileNavigator,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) =>
        getTabBarIcon(navigation, focused, tintColor)
    }),
    tabBarOptions: {
      activeTintColor: "black",
      inactiveTintColor: "gray"
    }
  }
);

export default BottomTabNavigator;
