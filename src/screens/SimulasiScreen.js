import React, { Component } from 'react';
import { WebView, StyleSheet, ActivityIndicator, AsyncStorage, Alert } from 'react-native';
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

  constructor(props) {
    super(props);

    this.state = {
      CIF: 1,
      url: 'http://pegadaian-sprint.herokuapp.com/public/simulasi/nikah',
      // url: ''
    };
  }

  async componentDidMount() {
    const CIF = await AsyncStorage.getItem('CIF');
    this.setState({ CIF: CIF })
  }

  loading() {
    return (
      <ActivityIndicator
        color="#009688"
        size="large"
        style={styles.loadingSpinner}
      />
    );
  }

  // -----  ini juga bisa sebenernyaaaa -----
  // handleWebViewNavigationStateChange = newNavState => {
  //   const { url } = newNavState;
  //   if (!url) {
  //     this.props.navigation.navigate('List')
  //   };

  //   if (url.includes('&tab=finished')) {
  //     this.webview.stopLoading();
  //     this.props.navigation.navigate('Home')
  //   }
  // }


  render() {
    // console.disableYellowBox = true;
    console.log(this.state.CIF)
    const angka = 1;
    return (
      <WebView
        reload
        // style={styles.container}
        // source={{ uri: 'http://pegadaian-sprint.herokuapp.com/public/?cif=' + this.state.CIF }}
        source={{ uri: this.state.url }}
        style={{ marginTop: 0 }}
        javaScriptEnabled={true}
        // domStorageEnabled={true}
        renderloading={this.loading}
        startInLoadingState={true}
        ref={(ref) => { this.webview = ref; }}
        // onNavigationStateChange={(event) => {   ---------- ini bisa brooo :) ---------------
        //   if (event.url !== this.state.url) {
        //     this.webview.stopLoading();
        //     this.props.navigation.navigate('List')
        //   }
        // }}
        onNavigationStateChange={this.handleWebViewNavigationStateChange}
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