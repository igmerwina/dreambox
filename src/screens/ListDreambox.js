import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
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
      data: [
        { id: 1, link: "Detail", name: "Rumah",       image: "https://img.icons8.com/color/100/000000/real-estate.png",       target: 2050 },
        { id: 2, link: "Detail", name: "Haji",        image: "https://img.icons8.com/clouds/100/000000/groups.png",           target: 2030 },
        { id: 3, link: "Detail", name: "Pendidikan",  image: "https://img.icons8.com/color/100/000000/find-matching-job.png", target: 2035 },
        { id: 4, link: "Detail", name: "Menikah",     image: "https://img.icons8.com/clouds/100/000000/employee-card.png",    target: 2025 },
        { id: 5, link: "Detail", name: "Tabungan",    image: "https://img.icons8.com/color/100/000000/land-sales.png",        target: 2030 },
      ]
    };
  }

  clickEventListener = (item) => {
    Alert.alert('Message', 'Item clicked. ' + item.name);
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.contentList}
          columnWrapperStyle={styles.listContainer}
          data={this.state.data}
          keyExtractor={(item) => {
            return item.name;
          }}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity style={styles.card} onPress={() => { this.props.navigation.navigate(item.link) }}>
                <Image style={styles.image} source={{ uri: item.image }} />
                <View style={styles.cardContent}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.target}>Target: {item.target}</Text>
                  <TouchableOpacity style={styles.followButton} onPress={() => { this.props.navigation.navigate(item) }} >
                    <Text style={styles.followButtonText}>Explore now</Text>
                  </TouchableOpacity>
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
    fontWeight: 'bold'
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
});  