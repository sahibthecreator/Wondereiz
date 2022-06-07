import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import {
  collection,
  query,
} from "firebase/firestore";
import { ScrollView } from "react-native";
import Header from "../components/Header";
import BottomTabs from "../components/BottomTabs";
import { TouchableOpacity } from "react-native-gesture-handler";
import { db } from "../Config";
import Post from "../components/Post"
import "firebase/compat/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";



export default function Home(props) {
  //let [trip, setTrip] = useState([]);
  let [trip_picture, setTripPicture] = useState([]);

  const ref = collection(db, "Room");
  const q = query(ref); //Where roo

  const [trips] = useCollectionData(query(ref));

  /*onSnapshot(q, (snapshot) => {
    let rooms = [];
    snapshot.docs.forEach((doc) => {
      rooms.push(doc.data()); //Adding one by one
    });
    setTrip(rooms);
    console.log(trip);
  });*/

  function DisplayTrips(props){
    const {cityFrom, cityTo} = props.trip;

    return (
      <Post post = {{
        trip_picture: 
        "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Amsterdam_Zentrum_20091106_075.JPG/1200px-Amsterdam_Zentrum_20091106_075.JPG",
        trip: cityFrom + " - " + cityTo,
 //     trip: trips[0].cityFrom + " - " + trips[0].cityTo,
        caption: "15 June 2022",
      }
      }/>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView>
        
        {trips ? 
        <View>
          {trips && trips.map((trp, trpIndex) => (<DisplayTrips key={trpIndex} trip={trp}/>))}
        </View>          
         : (
          <Text>No trips</Text>
        )}
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
