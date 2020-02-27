import React, { Component } from 'react';
import { MenuButton, Logo } from "../components/header/header";
import {
  Container,
  Content,
  Card,
  CardItem,
  Text,
  Item,
  Label,
  Form,
  Input,
  Button,
  DatePicker,
  Picker
} from 'native-base';
import { StyleSheet, TouchableHighlight, TouchableOpacity } from 'react-native';
import axios from 'axios';
import Icon from "react-native-vector-icons/Ionicons";

export default class InputDreambox extends Component {
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
      cif: 1278756,
      idKat: 'CA002',
      nominal: '',
      targetTercapai: '',
      konversiEmas: '',
      selected2: undefined
    };
  }

  onValueChange2(value: string) {
    this.setState({
      selected2: value
    });
  }

  _submit = () => {
    console.log('INPUT DREAMBOX');
    // if (this.state.nominal === '' && this.state.targetTercapai === '') {
    //   Alert.alert("Info", "Data Tidak Boleh Kosong");
    //   return;
    // }

    const param = {
      cif: this.state.cif,
      id_kategori: this.state.idKat,
      dana: this.state.nominal,
      target: this.state.tanggalTercapai
    };

    axios.post('http://mydreambox.herokuapp.com/dreambox/create', param)
      .then((res) => {
        const responseJSON = res.data
        if (responseJSON.data != null) {
          alert(responseJSON.data)
          return;
        }
        console.log(res.data)
        alert('Not OK')
      }).catch((error) => {
        console.log(error)
      });
  }

  render() {
    const konvertEmas = this.state.nominal / 7600;
    return (
      <Container>
        <Content style={styles.container}>
          <Card>
            <CardItem header bordered>
              <Text>Masukan Dream kamu</Text>
            </CardItem>
            <Form>
              <Item picker>
                <Picker
                  mode="dropdown"
                  iosIcon={<Icon name="arrow-down" />}
                  style={{ width: undefined }}
                  placeholder="Pilih Jenis Dreamboxmu"
                  placeholderStyle={{ color: "#bfc6ea" }}
                  placeholderIconColor="#007aff"
                  selectedValue={this.state.selected2}
                  onValueChange={this.onValueChange2.bind(this)}
                >
                  <Picker.Item label="Menikah" value="key0" />
                  <Picker.Item label="Pendidikan" value="key1" />
                  <Picker.Item label="Rumah" value="key2" />
                  <Picker.Item label="Kendaraan" value="key3" />
                  <Picker.Item label="Haji" value="key4" />
                </Picker>
              </Item>
              <Item stackedLabel>
                <Label>Nominal</Label>
                <Input
                  placeholder={"Rp"}
                  onChangeText={this.state.nominal}
                />
              </Item>
              <Item stackedLabel>
                <Label>Target Tercapai</Label>
                <DatePicker
                  defaultDate={new Date().getDate()}
                  minimumDate={new Date(2018, 1, 1)}
                  maximumDate={new Date(2018, 12, 31)}
                  locale={"id"}
                  timeZoneOffsetInMinutes={undefined}
                  modalTransparent={true}
                  animationType={"fade"}
                  androidMode={"default"}
                  placeHolderText="Pilih Target Tercapai Dreambox Kamu"
                  textStyle={{ color: "grey" }}
                  placeHolderTextStyle={{ color: "#d3d3d3" }}
                  onDateChange={this.setDate}
                  disabled={false}
                />
              </Item>
              <Item stackedLabel>
                <Label>Konversi Emas</Label>
                <Input
                  placeholder={"0 gram"}
                  onChangeText={konvertEmas}
                  disabled={true}
                />
              </Item>
            </Form>
          </Card>
          <TouchableOpacity onPress={() => this._submit()}>
            <Button block info style={styles.button} >
              <Text style={styles.buttonText}>Simpan</Text>
            </Button>
          </TouchableOpacity>
          {/* {
            this.state.nominal && (
              <Card>
                <CardItem>
                  <Body>
                    <Text>
                      Wanjaiiii
                    </Text>
                  </Body>
                </CardItem>
              </Card>
            )
          } */}
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  card: {
    flex: 1
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
    fontWeight: 'bold'
  }
})