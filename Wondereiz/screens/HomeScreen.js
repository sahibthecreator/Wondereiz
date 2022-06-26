import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, StyleSheet, RefreshControl } from "react-native";
import {
  collection,
  query,
  where,
  doc, getDoc, onSnapshot
} from "firebase/firestore";
import { ScrollView } from "react-native";
import Header from "../components/Header";
import BottomTabs from "../components/BottomTabs";
import { TouchableOpacity } from "react-native-gesture-handler";
import { app, db } from "../Config";
import Post from "../components/Post"
import "firebase/compat/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import Loading from "../components/Loading";


const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

export default function Home(navigation) {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const userUid = app.auth().currentUser.uid;

  let [trips, setTrips] = useState([]);
  let [trip_picture, setTripPicture] = useState([]);

  let savedRooms = [""];
  const myDoc = doc(db, "User", userUid);

  useEffect(() => { // The function executes only once
    getDoc(myDoc)
      .then((snapshot) => {
        if (snapshot.exists) {
          savedRooms = snapshot.data().savedRoomsId;
          console.log(savedRooms)

          let q = query(collection(db, "Room"), where("id", "not-in", savedRooms));
          onSnapshot(q, (snapshot) => {
            let tempRooms = [];
            snapshot.docs.forEach((doc) => {
              tempRooms.push(doc.data());
            });
            setTrips(tempRooms);
            //console.log(rooms);
          });
          //console.log(savedRooms);
        } else {
          console.log("No data");
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [])


  function DisplayTrips(props) {
    const { cityFrom, cityTo, id, travelDate, mainPicture } = props.trip;

    return (
      <Post post={{
        id: id,
        trip_picture: mainPicture,
        trip: cityFrom + " - " + cityTo,
        //     trip: trips[0].cityFrom + " - " + trips[0].cityTo,
        caption: travelDate,
        navigation: navigation.navigation
      }
      } />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >

        {trips ?
          <View>
            {trips && trips.map((trp, trpIndex) => (<DisplayTrips key={trpIndex} trip={trp} />))}
          </View>
          : (
            <Loading />
          )}
      </ScrollView>
      <BottomTabs navigation={navigation.navigation}></BottomTabs>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
});
