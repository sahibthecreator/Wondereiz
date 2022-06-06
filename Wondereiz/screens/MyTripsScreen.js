import React, { Component, useState } from "react";
import { Text, StyleSheet, Image, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { onAuthStateChanged } from "firebase/auth";
import { app, db } from "../Config";
import BottomTabs from "../components/BottomTabs";
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  getDoc,
} from "firebase/firestore";
import Post from "../components/Post";

export default function MyTrips(props) {
  //console.log("User UID: " + app.auth().currentUser.uid);
  const userUid = app.auth().currentUser.uid;

  let [rooms, setRooms] = useState([]);
  let [favourite, setFavourite] = useState(false);

  let q;

  if (favourite) {
    let savedRooms = [];
    const myDoc = doc(db, "User", userUid);

    getDoc(myDoc)
      .then((snapshot) => {
        if (snapshot.exists) {
          savedRooms = snapshot.data().savedRooms;
          console.log(savedRooms);
        } else {
          console.log("No data");
        }
      })
      .catch((error) => {
        alert(error.message);
      })
      .then(() => {
       // q = query(collection(db, "Room"), where("id", "in", savedRooms));
      })
    
  } else {
    q = query(collection(db, "Room"), where("adminUid", "==", userUid));
  }
  onSnapshot(q, (snapshot) => {
    let tempRooms = [];
    snapshot.docs.forEach((doc) => {
      tempRooms.push(doc.data());
    });
    setRooms(tempRooms);
    console.log(rooms);
  });

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.pageNameTxt}>My Trips</Text>
      <View style={{ width: "100%", flexDirection: "row" }}>
        <TouchableOpacity style={styles.allBtn}>
          <Text style={styles.containerTxt}>All</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.favBtn}>
          <Text style={styles.containerTxt}>Favourite</Text>
        </TouchableOpacity>
      </View>

      {rooms.length > 0 ? (
        <Post
          post={{
            trip_picture:
              "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Amsterdam_Zentrum_20091106_075.JPG/1200px-Amsterdam_Zentrum_20091106_075.JPG",
            trip: rooms[0].cityFrom + " - " + rooms[0].cityTo,
            caption: "15 June 2022",
          }}
        />
      ) : (
        <Text>No trips</Text>
      )}

      <BottomTabs navigation={props.navigation} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    alignItems: "center",
  },
  pageNameTxt: {
    fontSize: 25,
    fontWeight: "500",
    color: "#b61fb5",
    paddingBottom: 40,
  },
  allBtn: {
    width: "50%",
    borderBottomWidth: 1,
    borderBottomColor: "magenta",
  },
  favBtn: {
    width: "50%",
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
  },
  containerTxt: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
  },
});
