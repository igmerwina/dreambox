import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Alert,
  TouchableOpacity,
  Dimensions,
  AsyncStorage
} from 'react-native';
import { Spinner } from 'native-base';
import axios from "axios";

export default class LoginScreen extends Component {
  // dipake biar kebaca di stack navigator 
  static navigationOptions = ({ navigation }) => {
    return {
      headerLayoutPreset: "center"
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loading: false,
    }
  }

  _submit = () => {
    this.setState({ loading: true })
    if (this.state.email === '') {
      this.setState({ loading: false })
      Alert.alert("Info", "Email Tidak Boleh Kosong");
      return;
    }

    if (this.state.password === '') {
      this.setState({ loading: false })
      Alert.alert("Info", "Password Tidak Boleh Kosong");
      return;
    }

    if (this.state.email === '' && this.state.password === '') {
      this.setState({ loading: false })
      Alert.alert("Info", "Seluruh Data Harus Diisi!");
      return;
    }

    const param = {
      email: this.state.email,
      password: this.state.password
    };

    axios.post('http://mydreambox.herokuapp.com/auth/login', param)
      .then((res) => {
        const responseJSON = res.data.data
        const CIF = responseJSON.CIF

        AsyncStorage.setItem('CIF', CIF)
        this.setState({ loading: false })
        if (responseJSON != null) {
          this.props.navigation.navigate('Home')
          return;
        }
        alert('Terjadi Kesalahan OK');
      }).catch((error) => {
        console.log(error)
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.bgImage}
          source={{ uri: 'http://cdn.backgroundhost.com/backgrounds/subtlepatterns/gplaypattern.png' }}
        />
        <Image style={styles.imageContainer}
          source={require('./../assets/logo.png')}
        />
        {this.state.loading && (<Spinner color="green" />)}
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
            placeholder="Email"
            keyboardType="email-address"
            underlineColorAndroid='transparent'
            onChangeText={(email) => this.setState({ email })}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
            placeholder="Password"
            secureTextEntry={true}
            underlineColorAndroid='transparent'
            onChangeText={(password) => this.setState({ password })}
          />
        </View>

        {/* <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={this._submit}> */}
        <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.props.navigation.navigate('Home')} >
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonContainer} onPress={() => alert('button works')}>
          <Text>Forgot your password?</Text>
        </TouchableOpacity >

        <TouchableOpacity style={styles.buttonContainer} onPress={() => alert('button works')}>
          <Text>Register</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bgImage: {
    flex: 1,
    position: 'absolute',
    justifyContent: "center",
    alignItems: "center",
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    resizeMode: "cover"
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 250,
    height: 45,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  inputIcon: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
  },
  loginButton: {
    backgroundColor: "#00b5ec",
  },
  loginText: {
    color: 'white',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 250,
    height: 100,
  }
});