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
  ListItem
} from "native-base";

export default class HistoryScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: <MenuButton onPress={() => navigation.openDrawer()} />,
      headerTitle: <Logo />,
      headerBackTitle: "Search",
      headerLayoutPreset: "center"
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      transactionHistory: []
    };
  }

  componentDidMount() {
    fetch("http://mydreambox.herokuapp.com/dreambox/listtransaksi/74")
      .then(response => response.json())
      .then((responseJson) => {
        console.log(responseJson)
        this.setState({
          transactionHistory: responseJson.data
        })
      })
      .catch(error => console.log(error)) //to catch the errors if any
  }



  render() {
    return (
      <Container>
        <Content style={{ padding: 16 }}>
          <Card>
            <CardItem>
              <FlatList
                padding={10}
                data={this.state.transactionHistory}
                renderItem={({ item }) =>
                  <View style={{ height: 50 }}>
                    <Text style={{ height: 50 }}>{item.target_tanggal}</Text>
                    <View style={{ height: 1, backgroundColor: 'gray' }}></View>
                  </View>
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
  }
});
