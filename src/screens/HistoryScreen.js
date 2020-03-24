import { View, Text, StyleSheet, FlatList } from "react-native";
import React, { Component } from "react";
import { MenuButton, Logo } from "../components/header/header";
import axios from "axios";
import {
  Card,
  CardItem,
  Container,
  Content,
  List,
  ListItem,
  Spinner,
  H2,
  Left,
  Right
} from "native-base";
import { HeaderBackButton } from 'react-navigation';

export default class HistoryScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: <HeaderBackButton onPress={() => navigation.navigate('Home')} />,
      headerTitle: <Logo />,
      headerBackTitle: "Search",
      headerLayoutPreset: "center"
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      transactionHistory: [],
      titleHistory: '',
      loading: false
    };
  }

  componentDidMount() {
    this.setState({ loading: true })
    fetch("http://mydreambox.herokuapp.com/dreambox/listtransaksi/74")
      .then(response => response.json())
      .then((responseJson) => {
        console.log(responseJson.history)
        this.setState({
          loading: false,
          transactionHistory: responseJson.data.history,
          titleHistory: responseJson.data.nama_dreambox
        })
      })
      .catch(error => console.log(error))
  }

  render() {
    return (
      <Container>
        <Content style={{ padding: 16 }}>
          <H2 style={styles.title}>Daftar Transaksi</H2>
          <Card>
            <Text style={styles.titleHistory }>Jenis Impian: {this.state.titleHistory}</Text>
            <CardItem>
              {this.state.loading && (<Spinner style={styles.spinner} color="green" />)}
              <List
                dataArray={this.state.transactionHistory}
                renderRow={(item, key) =>
                  <ListItem>
                    <Left>
                      <Text>{item.target_tanggal}</Text>
                    </Left>
                    <Right>
                      <Text style={{ fontSize: 10 }}>+ {item.jumlah_gram_bulanan} gram</Text>
                    </Right>
                  </ListItem>
                }
              />
            </CardItem>
          </Card>
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    margin: 5,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#65A898'
  },
  titleHistory: {
    marginLeft: 20,
    marginTop: 5,
    marginBottom: 5,
    fontWeight: 'bold',
    color: '#65A899',
    textDecorationLine: 'underline',
    textDecorationColor: 'black'
  },
  spinner: {
    marginLeft: "50%"
  }
});
