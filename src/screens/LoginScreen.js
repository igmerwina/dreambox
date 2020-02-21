import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Image,
  Alert,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { APIDREAMBOX } from "../library/APIs";
import { createStackNavigator } from 'react-navigation';
import HomeScreen from "./HomeScreen";

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
    }
  }

  _submit = () => {
    if (this.state.email === '' && this.state.password === '') {
      Alert.alert("Info", "Data Tidak Boleh Kosong");
      return;
    }

    APIDREAMBOX().postLogin(this.state.email, this.state.password).then(response => {
      const responseJSON = response.data
      console.log(responseJSON)
      if(responseJSON.status != 'SUCCESS'){
        alert("Username Atau Password Salah")
        return;
      } 

      alert("Mantap!")
    })
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