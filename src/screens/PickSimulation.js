import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Slider
} from 'react-native';
import { Logo } from "../components/header/header";
import { H2 } from 'native-base';
import { HeaderBackButton } from 'react-navigation';

export default class PickSimulation extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: <HeaderBackButton onPress={() => navigation.navigate('Home')} />,
      headerTitle: <Logo />,
      headerBackTitle: "Input",
      headerLayoutPreset: "center"
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      data: [
        { title: "Menikah", image: "https://img-o.okeinfo.net/content/2019/05/11/196/2054399/mau-kaya-setelah-menikah-cari-pasangan-dari-3-suku-ini-EJwr4DGWCA.jpg" },
        { title: "Rumah", image: "https://www.intiland.com/wp-content/uploads/2019/12/desain-rumah-impian.jpg" },
        { title: "Pendidikan", image: "https://assets.kompasiana.com/items/album/2018/01/22/pendidikan-5a654be3cbe5237bc375e542.jpg?t=o&v=740&x=416" },
        { title: "Haji", image: "https://radartegal.com/wp-content/uploads/2020/03/haji_20180717_135623.jpg" },
        { title: "Kendaraan", image: "https://static.aturduit.com/articles/wp-content/uploads/motor-dan-mobil.jpg" },
      ]
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <H2 style={styles.textTitle}>Pilih Jenis Impianmu</H2>
        <FlatList style={styles.list}
          data={this.state.data}
          keyExtractor={(item) => {
            return item.id;
          }}
          ItemSeparatorComponent={() => {
            return (
              <View style={styles.separator} />
            )
          }}
          renderItem={(post) => {
            const item = post.item;
            return (
              <TouchableOpacity onPress={() => { this.props.navigation.navigate('Simulation'), console.log('ahasd') }}>
                <View style={styles.card}>
                  <Image style={styles.cardImage} source={{ uri: item.image }} />
                  <View style={styles.cardContent}>
                    <View>
                      <Text style={styles.title}>{item.title}</Text>
                      <Text style={styles.time}>{item.time}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            )
          }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    backgroundColor: "#E6E6E6",
  },
  separator: {
    marginTop: 1,
  },
  /******** card **************/
  card: {
    margin: 0,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: "#DCDCDC",
    backgroundColor: "#DCDCDC",
  },
  cardHeader: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
    //overlay efect
    flex: 1,
    height: 200,
    width: null,
    position: 'absolute',
    zIndex: 100,
    left: 0,
    right: 0,
    backgroundColor: 'transparent'
  },
  cardImage: {
    flex: 1,
    height: 150,
    width: null,
    opacity: 0.7
  },
  title: {
    fontSize: 22,
    color: "#ffffff",
    marginTop: 10,
    fontWeight: 'bold'
  },
  time: {
    fontSize: 13,
    color: "#ffffff",
    marginTop: 5
  },
  textTitle: {
    margin: 8,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#65A898'
  }
});  