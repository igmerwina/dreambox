import { StyleSheet, Image, ProgressBarAndroid } from "react-native";
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
  Left,
  Body,
  ListItem,
  Right,
  View,
  Spinner
} from 'native-base';

export default class DetailDreambox extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: <MenuButton onPress={() => navigation.openDrawer()} />,
      headerTitle: <Logo />,
      headerBackTitle: "Detail",
      headerLayoutPreset: "center"
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      update: false,
      cancel: false,
      loading: false,

      saldoTarget: '',
      namaDream: '',
      tanggalTercapai: '',
      urlGambar: '',
      autoDebit: '',
      saldoTotal: '',
      progress: '',
    };
  }

  componentDidMount() {
    this.setState({ loading: true })

    fetch("http://mydreambox.herokuapp.com/dreambox/detailbyid/74")
      .then(response => response.json())
      .then((responseJson) => {
        this.setState({
          loading: false,
          namaDream: responseJson.data[0].nama,
          urlGambar: responseJson.data[0].url_gambar,
          autoDebit: responseJson.data[0].tarikan_otomatis,
          saldoTotal: responseJson.data[0].saldo,
          saldoTarget: responseJson.data[0].target_gram,
          progress: responseJson.data[0].progress,
          tanggalTercapai: responseJson.data[0].target,
        })
      })
      .catch(error => console.log(error))
  }

  _update = () => {

  }

  render() {
    const persen = Number(this.state.progress * 100)
    const progress = Number(this.state.progress)

    return (
      <Container>
        {this.state.loading && (<Spinner  size={"large"} style={styles.spinner} color="green" />)}
        {!this.state.loading && (
          <Content style={{ padding: 10 }}>
            <Card style={{ padding: 10 }}>
              <H2 style={styles.title}>Aku ingin.... {this.state.namaDream} </H2>
              <CardItem>
                <Body>
                  <Image
                    source={{ uri: this.state.urlGambar }}
                    style={styles.images}
                  />
                </Body>
              </CardItem>
              <ListItem icon>
                <Left>
                  <Button disabled style={styles.buttonColor}>
                    <Icon active name="ios-arrow-dropup-circle" />
                  </Button>
                </Left>
                <Text>Tercapai Pada: </Text>
                <Right>
                  <Text>{this.state.tanggalTercapai}</Text>
                </Right>
              </ListItem>
              <ListItem icon>
                <Left>
                  <Button disabled style={styles.buttonColor}>
                    <Icon active name="ios-leaf" />
                  </Button>
                </Left>
                <Text>Saldo Emas Saat Ini: </Text>
                <Right>
                  <Text>{this.state.saldoTotal} gram</Text>
                </Right>
              </ListItem>
              <ListItem icon>
                <Left>
                  <Button disabled style={styles.buttonColor}>
                    <Icon active name="md-appstore" />
                  </Button>
                </Left>
                <Text>Target Saldo Emas : </Text>
                <Right>
                  <Text>{this.state.saldoTarget}</Text>
                </Right>
              </ListItem>
              <ListItem style={{ marginBottom: 20 }}>
                <View>
                  <Text>{"\n"} Target Pencapaian sudah mencapai {persen}% </Text>
                  <ProgressBarAndroid
                    styleAttr="Horizontal"
                    indeterminate={false}
                    progress={progress}
                    style={{ height: 16 }}
                  />
                </View>
              </ListItem>
            </Card>
            {!this.state.update && (
              <Button block info style={styles.button} onPress={() => { this.props.navigation.navigate('List') }}>
                <Text style={styles.buttonText}>Kembali</Text>
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
  }
});
