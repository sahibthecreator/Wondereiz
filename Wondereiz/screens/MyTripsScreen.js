import React, { Component, useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  View,
  Button,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
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
import { ScrollView } from "react-native-gesture-handler";
import Loading from "../components/Loading";

export default function MyTrips(props) {
  const userUid = app.auth().currentUser.uid;

  let [rooms, setRooms] = useState([]);
  let [favourite, setFavourite] = useState(false);
  let q;

  const allBtn = {
    width: "50%",
    borderBottomWidth: 1,
    borderBottomColor: "magenta",
  };
  const favBtn = {
    width: "50%",
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
  };

  if (favourite) {
    favBtn.borderBottomColor = "magenta";
    allBtn.borderBottomColor = "lightgray";
  } else {
    favBtn.borderBottomColor = "lightgray";
    allBtn.borderBottomColor = "magenta";
  }

  function RenderRooms(favourite) {
    setRooms("");
    if (favourite) {
      setFavourite(true);
      let savedRooms = [];
      const myDoc = doc(db, "User", userUid);

      getDoc(myDoc)
        .then((snapshot) => {
          if (snapshot.exists) {
            savedRooms = snapshot.data().savedRoomsId;

            q = query(collection(db, "Room"), where("id", "in", savedRooms));
            onSnapshot(q, (snapshot) => {
              let tempRooms = [];
              snapshot.docs.forEach((doc) => {
                tempRooms.push(doc.data());
              });
              setRooms(tempRooms);
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
    } else {
      setFavourite(false);
      q = query(collection(db, "Room"), where("adminUserUid", "==", userUid));
      onSnapshot(q, (snapshot) => {
        let tempRooms = [];
        snapshot.docs.forEach((doc) => {
          tempRooms.push(doc.data());
        });
        q = query(collection(db, "Room"), where("membersUserId", "array-contains", userUid));
        onSnapshot(q, (snapshot) => {
          snapshot.docs.forEach((doc) => {
            tempRooms.push(doc.data());
          });
        });
        setRooms(tempRooms);
      });
    }
  }

  useEffect(() => {
    RenderRooms(false);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.pageNameTxt}>My Trips</Text>
      <View style={{ width: "100%", flexDirection: "row" }}>
        <TouchableOpacity style={allBtn} onPress={() => RenderRooms(false)}>
          <Text style={styles.containerTxt}>All</Text>
        </TouchableOpacity>

        <TouchableOpacity style={favBtn} onPress={() => RenderRooms(true)}>
          <Text style={styles.containerTxt}>Favourite</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        {rooms ? (
          rooms.map((data, idx) => (
            <Post
              post={{
                id: rooms[idx].id,
                trip_picture: rooms[idx].mainPicture,
                trip: rooms[idx].cityFrom + " - " + rooms[idx].cityTo,
                caption: rooms[idx].travelDate,
                liked: favourite,
                props: props,
              }}
            />
          ))
        ) : (
          // <Text style={styles.noTripsTxt}>No trips</Text>
          <Loading />
        )}
      </ScrollView>
      <BottomTabs navigation={props.navigation} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  pageNameTxt: {
    fontSize: 25,
    fontWeight: "500",
    color: "#b61fb5",
    paddingBottom: 40,
    alignSelf: "center",
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
  noTripsTxt: {
    alignSelf: "center",
    fontSize: 25,
    fontWeight: "400",
    marginTop: 100,
  },
});
