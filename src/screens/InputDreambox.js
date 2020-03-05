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
  Picker,
  Spinner
} from 'native-base';
import axios from 'axios';
import moment from 'moment';
import Icon from "react-native-vector-icons/Ionicons";
import { TextInputMask } from "react-native-masked-text";
import { StyleSheet, TouchableHighlight, TouchableOpacity } from 'react-native';

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
      cif: '1011822505',
      idKat: 'CA001',
      nominal: '',
      targetTercapai: '2025-10-10',
      konversiEmas: '',
      // chosenDate: ''
      loading: false
    };
    // this.setDate = this.setDate.bind(this);
  }

  setDate(newDate) {
    this.setState({ chosenDate: newDate });
  }

  onValueChange2(value: string) {
    this.setState({
      selected2: value
    });
  }

  _submit = () => {
    console.log('INPUT DREAMBOX');
    console.log("cif: " + this.state.cif)
    console.log("id_kategori: " + this.state.idKat)
    console.log("dana: " + this.state.nominal)
    console.log("target: " + this.state.targetTercapai);

    this.setState({ loading: true })

    const param = {
      cif: this.state.cif,
      id_kategori: this.state.idKat,
      dana: this.state.nominal,
      target: this.state.targetTercapai
    };

    axios.post('http://mydreambox.herokuapp.com/dreambox/create', param)
      .then((res) => {
        const responseJSON = res.data
        if (responseJSON.status != "SUCCESS") {
          this.setState({ loading: false })
          console.log(res.data)
          alert('Data yang anda masukan salah')
          return;
        }
        this.setState({ loading: false })
        this.props.navigation.navigate('List');
      }).catch((error) => {
        this.setState({ loading: false })
        console.log(error)
      });
  }

  render() {
    const konvertEmas = this.state.nominal / 7600;

    return (
      <Container>
        <Content style={styles.container}>
          {this.state.loading && (<Spinner color="green" />)}
          <Card>
            <CardItem header bordered>
              <Text style={styles.picker}>Masukan Dream kamu</Text>
            </CardItem>
            <Form>
              <Item picker style={styles.picker}>
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
                  onChangeText={(nominal) => this.setState({ nominal })}
                />
              </Item>
              <Item stackedLabel>
                <Label>Target Tercapai</Label>
                <DatePicker
                  defaultDate={new Date().getDate()}
                  minimumDate={new Date(2025, 1, 1)}
                  maximumDate={new Date(3000, 12, 31)}
                  locale={"id"}
                  modalTransparent={true}
                  animationType={"slide"}
                  androidMode={"default"}
                  placeHolderText="Pilih Target Dreambox Kamu"
                  textStyle={{ color: "black" }}
                  placeHolderTextStyle={{ color: "#d3d3d3" }}
                  formatChosenDate={date => { return moment(date).format('YYYY-MM-DD'); }}
                  onDateChange={this.setDate}
                />
              </Item>
              <Item stackedLabel>
                <Label>Konversi Emas</Label>
                <Text>2 Gram</Text>
              </Item>
            </Form>
          </Card>
          {
            (this.state.nominal != '') && (
              <Card>
                <CardItem footer bordered>
                  <Text style={styles.notification}>
                    Saldo Kamu akan dipotong sebanyak 2 gram
                    </Text>
                </CardItem>
              </Card>
            )
          }
          <Button block info style={styles.button} onPress={this._submit}>
            <Text style={styles.buttonText}>Simpan</Text>
          </Button>
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
  },
  picker: {
    marginLeft: 20
  },
  notification: {
    color: 'red'
  }
})