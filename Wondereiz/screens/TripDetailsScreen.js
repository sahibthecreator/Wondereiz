import React, { Component, useState } from "react";
import { 
  StyleSheet,
  Text, 
  View, 
  Image,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { app, db } from "../Config";
import {
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";

export default function Trip_details(props) {
//console.log("User UID: " + app.auth().currentUser.uid);
//const userUid = app.auth().currentUser.uid;
//const roomId =;
let roomId = "room1";

let [rooms, setRooms] = useState([]);

let q = query(collection(db,'Room'), where ('id', '==', roomId));

onSnapshot(q, (snapshot) => {
  let tempRooms = [];
  snapshot.docs.forEach((doc) => {
    tempRooms.push(doc.data());
  });
  setRooms(tempRooms);
  console.log(rooms);
});

/*let cityFrom = rooms[0].cityFrom;
let cityTo = rooms[0].cityTo;
let tripPicture = rooms[0].mainPicture;
let aboutTheTrip = rooms[0].description;
let tripDate = rooms[0].travelDate;
let tripTime = rooms[0].travelTime;
let members = rooms[0].members;
let maxMembers = rooms[0].maxMembers;
let minAge = rooms[0].minAge;
let maxAge = rooms[0].maxAge;*/

let cityFrom = "Amsterdam";
let cityTo = "Groningen";
let tripPicture = "'../assets/amsterdam.png";
let aboutTheTrip = "I only like people who love cats. The others will not be accepted.";
let tripDate = "15 June 2022";
let tripTime = "12:00";
let members = "5";
let maxMembers = "6";
let minAge = "18";
let maxAge = "25";

let [user, setUser] = useState();

const favourite = () => setUser;

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
      <Text style={styles.header}>{cityFrom} - {cityTo}</Text>
      <View style={styles.details}>
        <Text style={styles.details_header}>About the trip</Text>
        <Text style={styles.details_text}>{aboutTheTrip}</Text>
      </View>
      <View style={[styles.room, {flexDirection: "row", alignContent: "space-between", flexWrap: "wrap"}]}>
        <View style={styles.room_info}>
          <Text style={styles.room_header}>Date</Text>
          <Text style={styles.room_text}>{tripDate}</Text>
        </View>
        <View style={styles.room_info}>
          <Text style={styles.room_header}>Time</Text>
          <Text style={styles.room_text}>{tripTime}</Text>
        </View>
        <View style={styles.room_info}>
          <Text style={styles.room_header}>Members</Text>
          <Text style={styles.room_text}>{members}/{maxMembers}</Text>
        </View>
        <View style={styles.room_info}>
          <Text style={styles.room_header}>Age</Text>
          <Text style={styles.room_text}>{minAge}-{maxAge}</Text>
        </View>
      </View>
      <View style={styles.like}>
        <TouchableOpacity onPress={like}>
          <Image 
          style={styles.heart}
          source={require('../assets/heart.png')} />
          <Text style={styles.like_text}>I like this trip</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.join}>
        <TouchableOpacity onPress={join}>
          <Text style={styles.join_text}>Join the trip</Text>
        </TouchableOpacity>
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