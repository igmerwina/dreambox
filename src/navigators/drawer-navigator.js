import React from "react";
import { createDrawerNavigator, createAppContainer } from "react-navigation";
import BottomTabNavigator from "./bottom-tab-navigator";
import { 
  InputDreamboxNav, 
  ListDreamboxNav, 
  CancelDreamboxNav, 
  AboutScreenNav, 
  SimulasiNav,
  DetailDreamboxNav,
  PickSimulasiNav
} 
from "./screen-stack-navigators";
import LoginScreen from '../../src/screens/LoginScreen';

// Data yang ditulis untuk sidebar ada dimari, kaya setting, dsb
const DrawerNavigator = createDrawerNavigator({
  /*To have a header on the drawer screens, 
        there must be a navigator that includes the screen you want to add to the drawer navigator.
        See 'screen-stack-navigator' file*/
  Login: LoginScreen,
  Home: BottomTabNavigator,
  List: ListDreamboxNav,
  Input: InputDreamboxNav,
  Cancel: CancelDreamboxNav,
  About: AboutScreenNav,
  Simulation: SimulasiNav,
  Detail: DetailDreamboxNav,
  PickSimulation: PickSimulasiNav,
});

const Drawer = createAppContainer(DrawerNavigator);

export default Drawer;
