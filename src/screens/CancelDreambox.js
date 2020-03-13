import { View, Text, StyleSheet, Alert } from "react-native";
import React, { Component } from "react";
import {
  Container,
  Content,
  H3,
  Button
} from 'native-base';
import axios from 'axios';
import { MenuButton, Logo } from "../components/header/header";
import RadioForm from 'react-native-simple-radio-button';

const radio_props = [
  { label: "Keluarga/Saudara Sakit", value: "Keluarga/Saudara Sakit" },
  { label: "Sedang Tertimpa Musibah", value: "Sedang Tertimpa Musibah" },
  { label: "Perubahan Rencana", value: "Perubahan Rencana" },
  { label: "Cepat Menikah", value: "Cepat Menikah" }
];

export default class CancelDreambox extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: <MenuButton onPress={() => navigation.openDrawer()} />,
      headerTitle: <Logo />,
      headerBackTitle: "Cancel",
      headerLayoutPreset: "center"
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      idDreambox: '',
      value: '',
    };
  }

  _submit = () => {
    const param = {
      id_dreambox: 74,
      keterangan: this.state.value,
    };

    console.log(param);
    axios.post('http://mydreambox.herokuapp.com/dreambox/cancel', param)
      .then((res) => {
        const responseJSON = res.data

        if (responseJSON.status != null) {
          Alert.alert('Info', 'Dream kamu berhasil dibatalkan!');
          this.props.navigation.navigate('Home');
          return;
        }
        alert('Terjadi Kesalahan OK');
      }).catch((error) => {
        console.log(error)
      });
  }

  render() {
    return (
      <Container>
        <Content>
          <H3 style={styles.title}>Berikan Alasan Pembatalan </H3>
          <View style={styles.radioContainer}>
            <RadioForm
              labelStyle={styles.radioLabel}
              radio_props={radio_props}
              initial={0}
              onPress={(value) => { this.setState({ value: value }) }}
              buttonSize={10}
              buttonOuterSize={20}
              buttonColor={'gray'}
              selectedButtonColor={'gray'}
            />
          </View>
          <View style={{padding: 10}}>
            <Button block info style={styles.button} onPress={this._submit}>
              <Text style={styles.buttonText}>SIMPAN</Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    padding: 20,
    textAlign: 'center'
  },
  button: {
    marginTop: 10,
    shadowColor: "#000000",
    shadowOpacity: 3,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1
    },
    elevation: 8
  },
  buttonText: {
    fontWeight: 'bold',
    color: 'white'
  },
  radioLabel: {
    fontSize: 16,
    marginBottom: 20
  },
  radioContainer: {
    padding: 5,
    marginLeft: 20
  }
});
