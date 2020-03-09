import React, { Component } from 'react';
import { WebView } from 'react-native';
import { MenuButton, Logo } from "../components/header/header";
import { Spinner } from 'native-base';

export default class SimlasiScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: <MenuButton onPress={() => navigation.openDrawer()} />,
      headerTitle: <Logo />,
      headerBackTitle: "Input",
      headerLayoutPreset: "center"
    };
  };

  constructor(props) {
    super(props);

    this.state = { visible: true };
  }

  showSpinner() {
    this.setState({ visible: true });
    <Spinner />
  }

  hideSpinner() {
    this.setState({ visible: false });
  }

  render() {
    return <WebView
      source={{ uri: 'http://pegadaian-sprint.herokuapp.com/public/' }} 
      style={{ marginTop: 0 }}
    />
  }
}