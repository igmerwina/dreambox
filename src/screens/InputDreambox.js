import { View, Text, StyleSheet } from "react-native";
import React, { Component } from "react";
import { MenuButton, Logo } from "../components/header/header";

export default class InputScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: <MenuButton onPress={() => navigation.openDrawer()} />,
      headerTitle: <Logo />,
      headerBackTitle: "Input",
      headerLayoutPreset: "center"
    };
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Input Dreambox</Text>
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
