import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import {
  collection,
  doc,
  getDoc,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { ScrollView } from "react-native";
import Header from "../components/Header";
import BottomTabs from "../components/BottomTabs";
import { TouchableOpacity } from "react-native-gesture-handler";
import { db } from "../Config";



export default function Home(props) {
  var [trip, setTrip] = useState([]);
  var [trip_picture, setTripPicture] = useState([]);

  const ref = collection(db, "Room", "Room1", "rooms");
  const q = query(ref, where('trip', '==', "Emmen-Eindhoven"));


  onSnapshot(q, (snapshot) => {
    let rooms = [];
    snapshot.docs.forEach((doc) => {
      trip.push(doc.data());
    });
    console.log(rooms);
  });


  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView>
        {trip.map((post, index) => (
          <Post post={post} key={index} />
        ))}
      </ScrollView>
      <BottomTabs navigation={props.navigation}></BottomTabs>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
});
