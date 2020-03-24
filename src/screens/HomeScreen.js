import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  FlatList,
  AsyncStorage,
} from 'react-native';
import { MenuButton, Logo } from "../components/header/header";
import Axios from 'axios';

export default class Home extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: <MenuButton onPress={() => navigation.openDrawer()} />,
      headerTitle: <Logo />,
      headerBackTitle: "Home",
      headerLayoutPreset: "center"
    };
  };

  async componentDidMount() {
    const data = await AsyncStorage.getItem('CIF', () => console.log('getItem completed'));
    console.log(data);
    return data;
  };

  constructor(props) {
    super(props);
    this.state = {
      data: [
        { link: "List", title: "My Dreambox", color: "#ededed", image: "https://img.icons8.com/office/70/000000/home-page.png" },
        { link: "Input", title: "Create Dreambox", color: "#ededed", image: "https://img.icons8.com/color/70/000000/classroom.png" },
        { link: "Profile", title: "Profile", color: "#ededed", image: "https://img.icons8.com/color/70/000000/name.png" },
        // { link: "Simulasi", title: "Simulation", color: "#ededed", image: "https://img.icons8.com/dusk/70/000000/checklist.png" },
      ]
    };
  }

  render() {
    console.disableYellowBox = true;
    return (
      <View style={styles.container}>
        <Image 
          source={{ uri: 'https://media.mnn.com/assets/images/2018/08/CollectionOfCloudsAgainstABlueSky.jpg.653x0_q80_crop-smart.jpg'}} 
          style={{ width: 500, height: 200 }}
        />
        <FlatList style={styles.list}
          contentContainerStyle={styles.listContainer}
          data={this.state.data}
          horizontal={false}
          numColumns={2}
          keyExtractor={(item) => {
            return item.id;
          }}
          renderItem={({ item, key }) => {
            return (
              <View>
                <TouchableOpacity style={[styles.card, { backgroundColor: item.color }]} onPress={() => { this.props.navigation.navigate(item.link) }}>
                  <Image style={styles.cardImage} source={{ uri: item.image }} />
                </TouchableOpacity>

                <View style={styles.cardHeader}>
                  <View style={{ alignItems: "center", justifyContent: "center" }}>
                    <Text style={[styles.title, styles.textColor]}>{item.title}</Text>
                  </View>
                </View>
              </View>
            )
          }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  list: {
    paddingHorizontal: 5,
    backgroundColor: "#fff",
  },
  listContainer: {
    alignItems: 'center'
  },
  textColor: {
    color: '#51965e'
  },
  /******** card **************/
  card: {
    shadowColor: '#474747',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,

    elevation: 12,
    marginVertical: 20,
    marginHorizontal: 40,
    backgroundColor: "#e2e2e2",
    width: 120,
    height: 120,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  cardHeader: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center"
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12.5,
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  cardImage: {
    height: 50,
    width: 50,
    alignSelf: 'center'
  },
  title: {
    fontSize: 20,
    flex: 1,
    alignSelf: 'center',
    fontWeight: 'bold'
  },
});      