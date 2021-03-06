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
import { HomeIcon, Logo } from "../components/header/header";
import { SliderBox } from "react-native-image-slider-box";
import Axios from 'axios';

export default class Home extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: <HomeIcon onPress={() => Alert.alert('Dreambox', 'By Kelompok 1 Sprint')} />,
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
      images: [
        "https://i.ytimg.com/vi/GQ6lNsR34kc/maxresdefault.jpg",
        "https://1.bp.blogspot.com/-fvrPMYeFkMs/XQMWzG8tQmI/AAAAAAAAAQo/7BPYsFTQ2AgfCV57zp1x82u1gROjtt5jwCLcBGAs/s1600/Badai%2BEmas%2BPegadaian.jpg",
        "http://news.unair.ac.id/wp-content/uploads/2019/05/Pegadaian-Foto.jpg",
      ],

      data: [
        { link: "List", title: "My Dreambox", color: "#ededed", image: "https://user-images.githubusercontent.com/8059548/77429836-d62a9800-6e0c-11ea-826f-60a4f7bc6c7d.png" },
        { link: "PickSimulation", title: "Create Dreambox", color: "#ededed", image: "https://user-images.githubusercontent.com/8059548/77429262-f60d8c00-6e0b-11ea-9fba-56d99a3ea0f3.png" },
        { link: "Profile", title: "Profile", color: "#ededed", image: "https://user-images.githubusercontent.com/8059548/77429790-c0b56e00-6e0c-11ea-92d6-6a1baa41ece5.png" },
      ]
    };
  }

  render() {
    console.disableYellowBox = true;
    return (
      <View style={styles.container}>
        <SliderBox
          images={this.state.images}
          dotColor="#ededed"
          ImageComponentStyle={styles.imageSlider}
          circleLoop={true}
          autoplay={true}
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
    height: 80,
    width: 80,
    alignSelf: 'center'
  },
  title: {
    marginTop: -20,
    fontSize: 20,
    flex: 1,
    alignSelf: 'center',
    fontWeight: 'bold'
  },
  imageSlider: {
    borderRadius: 5, 
    width: '98%', 
    marginTop: 5
  }
});      