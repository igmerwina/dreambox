import React, { Component } from 'react';
import Drawer from './src/navigators/drawer-navigator';
import { createAppContainer } from 'react-navigation';

export default class App extends React.Component {

  render() {
    return (
      <Drawer/>
    );
  }
}

