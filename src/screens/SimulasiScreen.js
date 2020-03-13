import React, { Component } from 'react';
import { WebView, StyleSheet, ActivityIndicator } from 'react-native';
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

  loading(){
    return (
      <ActivityIndicator
        color="#009688"
        size="large"
        style={styles.loadingSpinner}
      />
    );
  }

  render() {
    console.disableYellowBox = true;
    return (
      <WebView
        style={styles.container}
        source={{ uri: 'http://pegadaian-sprint.herokuapp.com/public/' }}
        style={{ marginTop: 0 }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        renderloading={this.Loading}
        startInLoadingState={true}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginTop: 10,
  },
  loadingSpinner: {
    flex: 1,
    justifyContent: 'center',
  },
});