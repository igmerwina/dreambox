import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';
import { MenuButton, Logo } from "../components/header/header";
import { Spinner } from 'native-base';
import { HeaderBackButton } from 'react-navigation';

export default class Profile extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: <HeaderBackButton onPress={() => navigation.navigate('Home')} />,
      headerTitle: <Logo />,
      headerBackTitle: "Profile",
      headerLayoutPreset: "center"
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      cif: '',
      nama: '',
      loading: false
    };
  }

  async componentDidMount() {
    const data = await AsyncStorage.getItem('CIF');
    this.setState({ loading: true, cif: data })

    fetch("http://mydreambox.herokuapp.com/profile/" + this.state.cif)
      .then(response => response.json())
      .then((responseJson) => {
        this.setState({
          loading: false,
          nama: responseJson.data[0].nama
        })
      })
      .catch(error => console.log(error))
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Image style={styles.header} source={{ uri: 'https://img.freepik.com/free-psd/tropical-foliage-background_53876-91352.jpg?size=626&ext=jpg' }} />
        </View>
        <Image style={styles.avatar} source={{ uri: 'https://photos1.iorbix.com/00/00/00/00/02/92/21/54/Natasha-Romanoff-ELdcGJ6c2-b.jpg' }} />
        <View style={styles.body}>
          <View style={styles.bodyContent}>
            {this.state.loading && (<Spinner color="green" />)}
            <Text style={styles.name}>{this.state.nama}</Text>
            <Text style={styles.info}>Core Developer at PT.Pegadaian Persero</Text>
            <Text style={styles.description}>
              I am a core developer at PT. Pegadaian{"\n"}
              I'm an Expert on java 8 and React Native{"\n"}
              Let always be grateful and happy :)
            </Text>
            {/* To-Do
              Make List Contact Information
             */}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    height: 200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 130
  },
  name: {
    fontSize: 22,
    color: "#FFFFFF",
    fontWeight: '600',
  },
  body: {
    marginTop: 40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding: 30,
  },
  name: {
    fontSize: 28,
    color: "#696969",
    fontWeight: "600"
  },
  info: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#3C6B61",
    marginTop: 10
  },
  description: {
    fontSize: 16,
    color: "#696969",
    marginTop: 10,
    textAlign: 'center'
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: "#00BFFF",
  },
});
