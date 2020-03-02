import React, { Component } from 'react';
import { WebView } from 'react-native';
import { MenuButton, Logo } from "../components/header/header";

export default class SimlasiScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: <MenuButton onPress={() => navigation.openDrawer()} />,
      headerTitle: <Logo />,
      headerBackTitle: "Input",
      headerLayoutPreset: "center"
    };
  };

  render() {
    return 
    <WebView 
      source={{ uri: 'http://pegadaian-sprint.herokuapp.com/public/' }} 
    />
  }
}