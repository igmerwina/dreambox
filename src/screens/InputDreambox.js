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
import { StyleSheet, TouchableHighlight, Image, AsyncStorage } from 'react-native';

export default class InputDreambox extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: <MenuButton onPress={() => navigation.openDrawer()} />,
      headerTitle: <Logo />,
      headerBackTitle: "Input",
      headerLayoutPreset: "center"
    };
  };

  // Get Data CIF pas Login
  async componentDidMount() {
    const data = await AsyncStorage.getItem('CIF');
    this.setState({ cif: data })
    console.log('Sukses ambil CIF: ' + data);
  };

  constructor(props) {
    super(props);

    this.state = {
      cif: '',
      idKategori: '',
      nominal: '',
      targetTercapai: '',
      konversiEmas: 0,
      index: '',
      totalMonth: 0,
      loading: false
    };
    this.setDate = this.setDate.bind(this);
  }

  setDate(date) {
    const formatDate = moment(date).format('YYYY-MM-DD');
    this.setState({ targetTercapai: formatDate });

    const today = moment();
    const monthDiff = Number(moment(date).diff(moment(today), 'months', true)).toFixed(0);
    this.setState({ totalMonth: monthDiff })
  }

  _submit = () => {
    this.setState({ loading: true })

    const param = {
      cif: this.state.cif,
      id_kategori: this.state.idKategori,
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
    const konvertEmas = Number((this.state.nominal) / 800000).toFixed(2)
    const autoDebitEmas = Number(konvertEmas/this.state.totalMonth).toFixed(0);

    return (
      <Container>
        <Content style={styles.container}>
          <Card>
            <CardItem header bordered>
              <Text style={styles.pickerTitle}>Masukan Dream kamu</Text>
            </CardItem>
            <Form>
              <Item picker style={styles.picker}>
                <Picker
                  mode="dropdown"
                  iosIcon={<Icon name="ios-arrow-dropdown" />}
                  placeholder="Pilih Jenis Dreamboxmu"
                  placeholderStyle={{ color: "#bfc6ea" }}
                  placeholderIconColor="#007aff"
                  selectedValue={this.state.idKategori}
                  onValueChange={(itemValue, itemIndex) => this.setState({ idKategori: itemValue, index: itemIndex })}
                >
                  <Picker.Item label="Haji" value="CA001" />
                  <Picker.Item label="Rumah" value="CA002" />
                  <Picker.Item label="Pendidikan" value="CA003" />
                  <Picker.Item label="Menikah" value="CA004" />
                  <Picker.Item label="Kendaraan" value="CA005" />
                </Picker>
              </Item>
              <Item stackedLabel>
                <Label>Nominal</Label>
                <Input
                  maxLength={15}
                  placeholder={"Rp"}
                  onChangeText={(nominal) => this.setState({ nominal })}
                  keyboardType={"numeric"}
                />
              </Item>
              <Item stackedLabel>
                <Label>Target Tercapai</Label>
                <DatePicker
                  defaultDate={new Date().getDate()}
                  minimumDate={new Date(2025, 1, 1)}
                  maximumDate={new Date(3000, 12, 31)}
                  locale={"id"}
                  format="YYYY-MM-DD"
                  modalTransparent={true}
                  animationType={"slide"}
                  androidMode={"default"}
                  placeHolderText="Pilih Target Dreambox Kamu"
                  textStyle={{ color: "black" }}
                  placeHolderTextStyle={{ color: "#d3d3d3" }}
                  formatChosenDate={date => { return moment(date).format('YYYY-MM-DD'); }}
                  onDateChange={date => this.setDate(date)}
                  disabled={false}
                />
              </Item>
              <Item stackedLabel>
                <Label>Konversi Emas</Label>
                <Text>{konvertEmas} gram</Text>
              </Item>
              <Item stackedLabel>
                <Label>Tarikan Emas Perbulan</Label>
                <Text>{autoDebitEmas} gram</Text>
              </Item>
              <Item stackedLabel>
                <Label>Tanggal Debit</Label>
                <Text>Tanggal 17</Text>
              </Item>
            </Form>
          </Card>
          {
            (this.state.nominal != '') && (
              <Card>
                <CardItem footer bordered>
                  <Text style={styles.notification}>
                    Saldo akan terpotong sebanyak {konvertEmas} gram
                  </Text>
                </CardItem>
              </Card>
            )
          }
          {this.state.loading && (<Spinner color="green" />)}
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
  pickerTitle: {
    color: '#65A898',
    marginLeft: 20
  },
  picker: {
    marginLeft: 20
  },
  notification: {
    alignContent: 'center',
    alignItems: 'center',
    color: '#65A999'
  }
})