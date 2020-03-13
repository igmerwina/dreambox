import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
  AsyncStorage
} from 'react-native';
import { Spinner, Button } from 'native-base';
import { MenuButton, Logo } from "../components/header/header";

export default class ListDreambox extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: <MenuButton onPress={() => navigation.openDrawer()} />,
      headerTitle: <Logo />,
      headerBackTitle: "List",
      headerLayoutPreset: "center"
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: false
    };
  }

  async componentDidMount() {
    this.setState({ loading: true })
    const CIF = await AsyncStorage.getItem('CIF');
    fetch('http://mydreambox.herokuapp.com/dreambox/listbycif/' + CIF)
      .then(response => response.json())
      .then((responseJson) => {
        this.setState({ loading: false })
        this.setState({ data: responseJson.data })
        console.log(this.state.data)
      })
      .catch(error => console.log(error))
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.loading && (<Spinner style={styles.loadingSpinner} color="green" />)}
        {this.state.data.length > 0 && (
          <FlatList
            style={styles.contentList}
            columnWrapperStyle={styles.listContainer}
            data={this.state.data}
            keyExtractor={(item) => { return item.id_dreambox }}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity style={styles.card} onPress={() => { this.props.navigation.navigate('Detail', { data: 74 }) }}>
                  <Image style={styles.image} source={{ uri: item.url_gambar }} />
                  <View style={styles.cardContent}>
                    <Text style={styles.name}>{item.kategori}</Text>
                    <Text style={styles.target}>Target Tanggal: {item.target}</Text>
                    <Text style={styles.target}>Target Rupiah: {item.target_rupiah}</Text>
                    <Text style={styles.target}>Status: {item.status}</Text>
                  </View>
                </TouchableOpacity>
              )
            }} />
        )}
        <TouchableOpacity>
          <Button block info style={styles.button} onPress={() => { this.props.navigation.navigate('Home') }}>
            <Text style={styles.buttonText}>KEMBALI</Text>
          </Button>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ebf0f7"
  },
  contentList: {
    flex: 1,
  },
  cardContent: {
    marginLeft: 20,
    marginTop: 10
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: "#ebf0f7"
  },

  card: {
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,

    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    backgroundColor: "white",
    padding: 10,
    flexDirection: 'row',
    borderRadius: 30,
  },

  name: {
    fontSize: 18,
    flex: 1,
    alignSelf: 'center',
    color: "#3399ff",
    fontWeight: 'bold'
  },
  target: {
    fontSize: 14,
    flex: 1,
    alignSelf: 'center',
    color: "#6666ff",
    fontWeight: 'normal',
    textAlign: 'left'
  },
  followButton: {
    marginTop: 10,
    height: 35,
    width: 100,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#dcdcdc",
  },
  followButtonText: {
    color: "#dcdcdc",
    fontSize: 12,
  },
  noList: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  loadingSpinner: {
    flex: 1,
    justifyContent: 'center',
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
});  