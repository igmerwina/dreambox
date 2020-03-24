import React, { Component } from "react";
import { createStackNavigator } from "react-navigation";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import HistoryScreen from "../screens/HistoryScreen";
import AboutScreen from "../screens/AboutScreen";
import ListDreambox from "../screens/ListDreambox";
import InputDreambox from "../screens/InputDreambox";
import CancelDreambox from "../screens/CancelDreambox";
import DetailDreambox from "../screens/DetailDreambox";
import SimulasiScreen from "../screens/SimulasiScreen";
import PickSimulation from "../screens/PickSimulation";

//Add navigators with screens in this file
export const HomeNavigator = createStackNavigator({
  Home: { screen: HomeScreen }
});

export const ProfileNavigator = createStackNavigator({
  Profile: { screen: ProfileScreen }
});

export const SearchNavigator = createStackNavigator({
  Search: { screen: HistoryScreen }
});

export const ListDreamboxNav = createStackNavigator({
  List: { screen: ListDreambox }
})

export const InputDreamboxNav = createStackNavigator({
  Input: { screen: InputDreambox }
})

export const CancelDreamboxNav = createStackNavigator({
  Cancel: { screen: CancelDreambox }
})

export const AboutScreenNav = createStackNavigator({
  About: { screen: AboutScreen }
})

export const DetailDreamboxNav = createStackNavigator({
  Detail: { screen: DetailDreambox }
})

export const SimulasiNav = createStackNavigator({
  Simulasi : { screen: SimulasiScreen }
})

export const PickSimulasiNav = createStackNavigator({
  Simulasi : { screen: PickSimulation }
})