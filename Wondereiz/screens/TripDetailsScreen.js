import React, { Component, useState } from "react";
import { 
  StyleSheet,
  Text, 
  View, 
  Image,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { app } from "../Config";

export default function Trip_details(props) {
//console.log("User UID: " + app.auth().currentUser.uid);
const userUid = app.auth().currentUser.uid;

let [rooms, setRooms] = useState([]);

let q = query(collection(db,'Room'), where ());

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity 
      style={styles.exit}
      onPress={() => props.navigation.navigate("Home")}>
        <Image source={require('../assets/cross.png')} />
      </TouchableOpacity>
      <View style={styles.photo}>
        <Image source={require('../assets/amsterdam.png')} />
      </View>
      <Text style={styles.header}>Eindhoven - Amsterdam</Text>
      <View style={styles.details}>
        <Text style={styles.details_header}>About the trip</Text>
        <Text style={styles.details_text}>I only like people who love cats. The others will not be accepted.</Text>
      </View>
      <View style={[styles.room, {flexDirection: "row", alignContent: "space-between", flexWrap: "wrap"}]}>
        <View style={styles.room_info}>
          <Text style={styles.room_header}>Date</Text>
          <Text style={styles.room_text}>15 June 2022</Text>
        </View>
        <View style={styles.room_info}>
          <Text style={styles.room_header}>Time</Text>
          <Text style={styles.room_text}>12:00</Text>
        </View>
        <View style={styles.room_info}>
          <Text style={styles.room_header}>Members</Text>
          <Text style={styles.room_text}>5/6</Text>
        </View>
        <View style={styles.room_info}>
          <Text style={styles.room_header}>Age</Text>
          <Text style={styles.room_text}>18-25</Text>
        </View>
      </View>
      <View style={styles.like}>
        <Image 
        style={styles.heart}
        source={require('../assets/heart.png')} />
        <Text style={styles.like_text}>I like this trip</Text>
      </View>
      <View style={styles.join}>
        <Text style={styles.join_text}>Join the trip</Text>
      </View>
  </SafeAreaView>
)};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF'
  },
  exit: {
    position: 'absolute',
    top: 50,
    left: 20,
  },
  header: {
    top: 140,
    color: '#8736AA',
    fontWeight: 'bold',
    fontSize: 20,
    position: 'absolute',
  },
  photo: {
    borderRadius: 100,
    height: 185,
    width: 185,
    overflow: 'hidden',
    position: 'absolute',
    top: 200,
  },
  details: {
    top: 35,
    margin: 25,
    padding: 20,
    paddingBottom: 30,
    paddingTop: 30,
    borderRadius: 20,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    position: 'relative',
    top: 50,

  },
  details_header: {
    alignItems: 'flex-start',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4B4B4B',
    marginBottom: 10,
  },
   details_text: {
    color: '#4B4B4B',
    fontSize: 15,
    alignItems: 'flex-start',
   },
   room: {
    position: 'absolute',
    top: 625,

   },
   room_info: {
     marginRight:50,
     marginLeft: 70,
     marginBottom: 30,

   },
   room_header: {
    color: '#606060',
    fontWeight: 'bold',
    fontSize: 18,
   },
   room_text: {
    color: '#606060',
    fontSize: 14,
    marginTop: 5,
   },
   like: {
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: 250,
    height: 100,
    position: 'absolute',
    bottom: 0,
    left: 0,
   },
   heart: {
     position: 'absolute',
     bottom: 40,
     left: 25,
   },
   like_text: {
     fontWeight: 'bold',
     fontSize: 20,
     color: '#D50FBC',
     position: 'absolute',
     bottom: 40,
     left: 60,
   },
   join: {
      padding: 35,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      backgroundColor: '#D50FBC',
      width: 200,
      height: 100,
      position: 'absolute',
      bottom: 0,
      right: 0,
   },
   join_text: {
     fontWeight: 'bold',
     fontSize: 20,
     color: '#FFFFFF',
   }
});