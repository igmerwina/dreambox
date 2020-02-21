import React, { Component } from 'react';
import Drawer from './src/navigators/drawer-navigator';
import LoginScreen from './src/screens/LoginScreen';
import { createAppContainer } from 'react-navigation';
import StackNavigators from './src/navigators/StackNavigator'

const AppContainer = createAppContainer(StackNavigators);

export default class App extends React.Component {

  render() {
    return (
      <Drawer/>
      // <LoginScreen />
      // <AppContainer />
    );
  }
}

