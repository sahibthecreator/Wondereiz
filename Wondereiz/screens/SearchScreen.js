import React, { useState } from 'react';
import {View,Text,StyleSheet,SafeAreaView,Image, TouchableOpacity, FlatList} from 'react-native';
import BottomTabs from "../components/BottomTabs";
import SearchBox from "../components/SearchBox";
import PropTypes from 'prop-types';
import { TextInput } from 'react-native-gesture-handler';
import firebase from 'firebase/compat';
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  getDoc,
} from "firebase/firestore";
require('firebase/firestore');

export default function SearchPage(props) {
        const [Room, setRoom] = useState([])

        const fetchRoom = (search) => {
          firebase.firestore()
          .collection('Room')
          where('name', '=>', search)
          .get()
          .then((snapshot) => {
            let users = snapshot.docs.map(doc => {
                const data = doc.data();
                const id = doc.id;
                return {id, ...data }
            });
            setRoom(Room);
          })
        }
        // const SearchScreen = (props) => {
        // const [searchQuery, setSearchQuery] = React.useState('');
        // const onChangeSearch = query => setSearchQuery(query);
      
        return (
          <SafeAreaView style={styles.container}>
            {/* <Searchbar
            placeholder="Search"
            onChangeText={onChangeSearch}
            value={searchQuery}
          /> */}
            <View style={styles.header}>
              <View style={styles.searchBar}> 
                <SearchBox navigation={props.navigation} onChangeText={(search)=> fetchRoom(search)}/>
                {/* <TextInput onChangeText={(search)=> fetchRoom(search)} placeholder="Search Here"/> */}
                <FlatList 
                    numColumns={1}
                    horizonta={false}
                    data={Room}
                    renderItem={({item}) =>
                    <Text>{item.cityFrom}</Text>
                  }
                />
                <TouchableOpacity onPress={() => props.navigation.navigate("Filters") }>
                     <Image source={require('../assets/filter.png')}  style={styles.FilterIcon} />
                </TouchableOpacity>
              </View>  
            </View>
            <View style={styles.main}>
              <View style={styles.recommandation}>
                <View style={styles.tripPhoto}>
                  <Image
                      source={{
                        uri: "https://media.cntraveller.com/photos/611be7c7a106ea5ed3099f8c/4:3/w_2664,h_1998,c_limit/amsterdam-mag-jan19-matthew-buck23.jpg",
                      }}
                      style={styles.groupImg}
                  />
                </View>
                <View style={styles.tripDetails}>
                  <Text style={styles.tripName}> Eindhoven - Amsterdam</Text>
                  <Text style={styles.tripDate}> 15 June 2022</Text>
                </View>
                <View style={styles.options}>
                   <TouchableOpacity onPress={() => props.navigation.navigate("") }>
                    <Image source={require('../assets/heart.png')}  style={styles.favourite} />
                    </TouchableOpacity>
                  <Text style={styles.members}> 2/6 </Text>
                </View>
              </View>
              <View style={styles.recommandation}>
                <View style={styles.tripPhoto}>
                <Image
                      source={{
                        uri: "https://media.cntraveller.com/photos/611be7c7a106ea5ed3099f8c/4:3/w_2664,h_1998,c_limit/amsterdam-mag-jan19-matthew-buck23.jpg",
                      }}
                      style={styles.groupImg}
                  />
                </View>
                <View style={styles.tripDetails}>
                  <Text style={styles.tripName}> Emmen - Amsterdam</Text>
                  <Text style={styles.tripDate}> 15 June 2022</Text>
                </View>
                <View style={styles.options}>
                  <Image source={require('../assets/heart.png')}  style={styles.favourite} />
                  <Text style={styles.members}> 2/6 </Text>
                </View>
              </View>
              <View style={styles.recommandation}>
                <View style={styles.tripPhoto}>
                <Image
                      source={{
                        uri: "https://media.cntraveller.com/photos/611be7c7a106ea5ed3099f8c/4:3/w_2664,h_1998,c_limit/amsterdam-mag-jan19-matthew-buck23.jpg",
                      }}
                      style={styles.groupImg}
                  />
                </View>
                <View style={styles.tripDetails}>
                  <Text style={styles.tripName}> Groningen - Amsterdam</Text>
                  <Text style={styles.tripDate}> 15 June 2022</Text>
                </View>
                <View style={styles.options}>
                  <Image source={require('../assets/heart.png')}  style={styles.favourite} />
                  <Text style={styles.members}> 2/6 </Text>
                </View>
              </View>
            </View>
            <View style={styles.footer}>
                <BottomTabs navigation={props.navigation} />
            </View>
          </SafeAreaView>
        )
    //   };
}
//styling for the page
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      //justifyContent: "space-around",
      justifyContent: 'center',
      backgroundColor: "white",
    },
    header: {
      marginTop: 50,
      marginLeft: 20,
      marginRight: 30,
      // justifyContent: "space-around",
      
      marginBottom: 20,
      // height: '30%',
    //   flex: 1,
    //   flexDirection: 
      
    },
    searchBar: {
      alignItems: "center",
      // backgroundColor: '#e4e6eb',
      height: 30,
      // width: 300,
      borderRadius: 20,
      flexDirection: 'row',
    },
    
    FilterIcon: {
        width: 30,
      height: 30,
      marginLeft: 10,
    },
    main: {
      //  height: '50%',
       flex:1,
      //  height: '80%',
  
    },
    recommandation: {
      backgroundColor: '#e4e6eb',
      // height: 200,
      width: 350,
      marginTop: 20,
      marginRight: 16,
      marginRight: 16,
      borderRadius: 16,
      flexDirection: 'row',
    },
    groupImg: {
      marginLeft: 10,
      // marginTop: 20,
      width: 60,
      height: 60,
      borderRadius: 30
    },
    tripDetails:{
      marginTop: 5,
      marginLeft: 10,
      width: 200,
    },
    tripName: {
      fontSize: 15,
      fontWeight: "500",
      color: "#b61fb5",
    },
    tripDate: {
      marginTop: 5,
      fontSize: 12,
      fontWeight: "500",
      color: "grey",
    },
    options: {
      marginLeft: 20,
      marginRight: 40,
  
  
    },
    favourite: {
      marginTop: 7,
  
    },
    members: {
      fontSize: 11,
      fontWeight: "500",
      color: "grey",
      marginTop: 2,
    },
    footer: {
      width: '100%',
      height: '10%',
    },
  });