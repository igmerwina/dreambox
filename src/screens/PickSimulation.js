import { View, Text, StyleSheet } from "react-native";
import React, { Component } from "react";
import { MenuButton, Logo } from "../components/header/header";
import { HeaderBackButton } from "react-navigation";

export default class PickSimulation extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: <HeaderBackButton onPress={() => navigation.navigate('Home')} />,
      headerTitle: <Logo />,
      headerBackTitle: "Settings",
      headerLayoutPreset: "center"
    };
  };
  render() {
    return (
      <View style={styles.container}>
        <Text>Pick Simulation</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
