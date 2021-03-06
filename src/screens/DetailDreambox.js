import { StyleSheet, Image, ProgressBarAndroid, Alert, AsyncStorage } from "react-native";
import React, { Component } from "react";
import { MenuButton, Logo } from "../components/header/header";
import {
  Container,
  Content,
  Card,
  CardItem,
  H1, H2, H3,
  Text,
  Button,
  Icon,
  Body,
  ListItem,
  DatePicker,
  View,
  Spinner,
  Item,
  Input
} from 'native-base';
import axios from 'axios';
import moment from 'moment';
import { HeaderBackButton } from 'react-navigation';

export default class DetailDreambox extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: <HeaderBackButton onPress={() => navigation.navigate('List')} />,
      headerTitle: <Logo />,
      headerBackTitle: "Detail",
      headerLayoutPreset: "center"
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      modal: false,
      update: false,
      cancel: false,
      loading: false,

      namaDream: '',
      tanggalTercapai: '',
      urlGambar: 'Loading...',
      targetEmas: '',
      progress: '',
      cif: '',

      flag: '',

      idDreambox: 74,
      totalDana: 0,
    };
    this.setDate = this.setDate.bind(this);
  }

  async componentDidMount() {
    const CIF = await AsyncStorage.getItem('CIF');
    this.setState({ loading: true, cif: CIF });

    fetch("http://mydreambox.herokuapp.com/dreambox/detailbyid/75")
      .then(response => response.json())
      .then((responseJson) => {
        this.setState({
          loading: false,
          totalDana: responseJson.data[0].target_rupiah,
          namaDream: responseJson.data[0].kategori,
          urlGambar: responseJson.data[0].url_gambar,
          targetEmas: responseJson.data[0].target_gram,
          progress: responseJson.data[0].progress,
          tanggalTercapai: responseJson.data[0].target,
          flag: responseJson.data[0].flag,
        })
      })
      .catch(error => console.log(error))
  }

  setDate(date) {
    const formatDate = moment(date).format('YYYY-MM-DD')
    this.setState({ tanggalTercapai: formatDate });
  }

  _setUpdate = () => {
    this.setState({ update: !this.state.update })
  }

  _simpanUpdate = () => {
    this.setState({ loading: true, update: !this.state.update })

    const param = {
      cif: this.state.cif,
      id_dreambox: this.state.idDreambox,
      dana: this.state.totalDana,
      target: this.state.tanggalTercapai
    };

    console.log(param)

    axios.post('http://mydreambox.herokuapp.com/dreambox/update', param)
      .then((res) => {
        const responseJSON = res.data
        console.log(responseJSON);
        if (responseJSON.status != "SUCCESS") { // khusus buat rekaman. nanti hapus lagi. validasi eror salah soalnya
          this.setState({ loading: false })
          console.log(res.data)
          Alert.alert('Data yang anda masukan salah')
          return;
        }
        this.setState({ loading: false })
        Alert.alert('Sukses', 'Update Berhasil!')
      }).catch((error) => {
        this.setState({ loading: false })
        console.log(error)
      });
  }

  render() {
    const persen = Number(this.state.progress * 100).toFixed(1)
    const progress = Number(this.state.progress)

    return (
      <Container>
        {this.state.loading && (<Spinner size={"large"} style={styles.spinner} color="green" />)}
        {!this.state.loading && (
          <Content style={styles.paddingTen}>
            <Card style={styles.paddingTen}>
              <H2 style={styles.title}>Aku ingin.... {this.state.namaDream} </H2>
              <CardItem>
                <Body>
                  <Image
                    source={{ uri: this.state.urlGambar }}
                    style={styles.images}
                  />
                </Body>
              </CardItem>
              {this.state.flag === 1 && (
                <View style={styles.buttonGroup}>
                  <Button warning small onPress={() => this._setUpdate()}>
                    <Text>Update</Text>
                    <Icon name="ios-refresh" />
                  </Button>
                  <Button small danger onPress={() => this.props.navigation.navigate('Cancel')}>
                    <Text>Cancel</Text>
                    <Icon name="ios-repeat" />
                  </Button>
                </View>
              )}
              <View style={styles.paddingTen}>
                <View style={styles.inputPosition}>
                  <Icon active name='ios-calendar' />
                  <Text> Target Selesai: </Text>
                  <Item>
                    {!this.state.update ? (
                      <Input
                        disabled
                        style={styles.inputDream}
                        disabled={true}>
                        {this.state.tanggalTercapai}
                      </Input>
                    ) : (
                        <DatePicker
                          minimumDate={new Date(2021, 0, 1)}
                          maximumDate={new Date(3000, 12, 31)}
                          locale={"id"}
                          underlineColorAndroid="#65A898"
                          modalTransparent={true}
                          animationType={"slide"}
                          androidMode={"default"}
                          placeHolderText="Ganti Tanggal Targetmu"
                          textStyle={{ color: "black" }}
                          placeHolderTextStyle={{ color: "#d3d3d3" }}
                          formatChosenDate={date => { return moment(date).format('YYYY-MM-DD'); }}
                          onDateChange={date => this.setDate(date)}
                          disabled={false}
                        />
                      )}
                  </Item>
                </View>
                <View style={styles.inputPosition}>
                  <Icon active name='md-cash' />
                  <Text> Total Dana: Rp </Text>
                  <Item>
                    {!this.state.update ? (
                      <Input
                        disabled
                        style={styles.inputDream}
                        disabled={true}>
                        {this.state.totalDana}
                      </Input>
                    ) : (
                        <Input
                          style={styles.inputDream}
                          underlineColorAndroid="#65A898"
                        >
                          {this.state.totalDana}
                        </Input>
                      )}
                  </Item>
                </View>
                <View style={styles.inputPosition}>
                  <Icon active name='ios-timer' />
                  <Text> Target Gram Emas: </Text>
                  <Item>
                    <Input
                      disabled
                      style={styles.inputDream}
                      disabled={!this.state.update}>
                      {this.state.targetEmas}
                    </Input>
                  </Item>
                </View>
              </View>
              <ListItem>
                <View style={styles.marginProgress}>
                  <Text> Target Pencapaian: {persen}% </Text>
                  <ProgressBarAndroid
                    styleAttr="Horizontal"
                    indeterminate={false}
                    progress={progress}
                  />
                </View>
              </ListItem>
            </Card>
            {!this.state.update ? (
              <Button block info style={styles.button} onPress={() => { this.props.navigation.navigate('List') }}>
                <Text style={styles.buttonText}>Kembali</Text>
              </Button>
            ) : (
                <Button block primary style={styles.button} onPress={this._simpanUpdate} >
                  <Text style={styles.buttonText}>Simpan</Text>
                </Button>
              )}
          </Content>
        )}
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    fontWeight: "bold",
    textAlign: 'center',
    color: '#65A898'
  },
  images: {
    padding: 5,
    height: 200,
    width: 320,
    flex: 1,
    alignItems: 'center'
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
  buttonColor: {
    backgroundColor: "#65A898",
  },
  padding: {
    padding: 10
  },
  spinner: {
    marginTop: "50%",
    alignItems: "center"
  },
  inputDream: {
    marginRight: 30
  },
  inputPosition: {
    marginRight: 10,
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: "center"
  },
  paddingTen: {
    padding: 10
  },
  buttonGroup: {
    marginLeft: 15,
    marginRight: 15,
    marginBottom: -7,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  marginProgress: {
    marginBottom: -10
  }
});
