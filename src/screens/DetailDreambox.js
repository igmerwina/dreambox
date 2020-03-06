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
  View
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

  render() {
    return (
      <Container>
        <Content style={{ padding: 10 }}>
          <Card style={{ padding: 10 }}>
            <H2 style={{ textAlign: 'center', color: '#65A898' }}>Impian Rumah Kamu</H2>
            <CardItem>
              <Body>
                <Image
                  source={{ uri: 'https://rumahdijual.com/attachments/bsd/6452585d1470903675-perumahan-bsd-city-akses-tol-bsd-jakarta-amarine-020.jpg' }}
                  style={{ height: 200, width: 320, flex: 1, alignItems: 'center' }}
                />
              </Body>
            </CardItem>
            <ListItem icon>
              <Left>
                <Button style={{ backgroundColor: "#65A898" }}>
                  <Icon active name="ios-arrow-dropup-circle" />
                </Button>
                <Text> Target Tercapai:                  </Text>
              </Left>
              <Right>
                <Text>2050</Text>
              </Right>
            </ListItem>
            <ListItem icon>
              <Left>
                <Button style={{ backgroundColor: "#65A898" }}>
                  <Icon active name="ios-leaf" />
                </Button>
                <Text> Saldo Emas Saat Ini: </Text>
              </Left>
              <Right>
                <Text>800 gram</Text>
              </Right>
            </ListItem>
            <ListItem icon>
              <Left>
                <Button style={{ backgroundColor: "#65A898" }}>
                  <Icon active name="md-appstore" />
                </Button>
                <Text> Pemotongan:          </Text>
              </Left>
              <Right>
                <Text>Tanggal 17</Text>
              </Right>
            </ListItem>
            <ListItem icon>
              <Left>
                <Button style={{ backgroundColor: "#65A898" }}>
                  <Icon active name="logo-freebsd-devil" />
                </Button>
                <Text> Target Dreambox:      </Text>
              </Left>
              <Right>
                <Text>800 gram</Text>
              </Right>
            </ListItem>
            <ListItem>
              <View>
                <Text>{"\n"} Target Pencapaian sudah mencapai 60%</Text>
                <ProgressBarAndroid
                  styleAttr="Horizontal"
                  indeterminate={false}
                  progress={3.5}
                />
              </View>
            </ListItem>
          </Card>
          <Button block info style={styles.button} onPress={() => { this.props.navigation.navigate('List') }}>
            <Text style={styles.buttonText}>Kembali</Text>
          </Button>
        </Content>
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
});
