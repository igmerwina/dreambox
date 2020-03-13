import React, { Component } from 'react';
import { WebView, StyleSheet, ActivityIndicator , AsyncStorage} from 'react-native';
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

    this.state = { CIF: '' };
  }

  async componentDidMount(){
    const CIF = await AsyncStorage.getItem('CIF');
    this.setState({ CIF: CIF })
  }

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
    console.log(this.state.CIF)
    return (
      <WebView
        style={styles.container}
        // source={{ uri: 'http://pegadaian-sprint.herokuapp.com/public/?cif=' + this.state.CIF }}
        source={{ uri: 'http://pegadaian-sprint.herokuapp.com/public/simulasi/nikah?cif=1011822505' }}
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