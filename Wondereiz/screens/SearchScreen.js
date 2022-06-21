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
import { ScrollView, TextInput } from "react-native-gesture-handler";
import Loading from "../components/Loading";

export default function SearchPage(props) {
  const userUid = app.auth().currentUser.uid;

  let [rooms, setRooms] = useState([]);
  let [resultRooms, setResultRooms] = useState([]);
  let q;

  useEffect(() => {
    setRooms("");
    q = query(collection(db, "Room"));
    onSnapshot(q, (snapshot) => {
      let tempRooms = [];
      snapshot.docs.forEach((doc) => {
        tempRooms.push(doc.data());
      });
      setRooms(tempRooms);
      setResultRooms(
        rooms.filter((room) => {
          console.log(resultRooms);
          return (
            room.cityTo.includes("Amsterdam") ||
            room.cityFrom.includes("Amsterdam")
          );
        })
      );
      //console.log(rooms);
    });
  }, []);

  function getResultRooms(query){
    setResultRooms(
      rooms.filter((room) => {
        console.log(props);
        return (
          room.cityTo.includes(query) && 
          props.route.params.day? room.travelDate.includes(props.route.params.day): false &&
            props.route.params.month? room.travelDate.includes(props.route.params.month): false &&
            props.route.params.year? room.travelDate.includes(props.route.params.year): false
            //props.route.params.cityFrom? room.cityFrom.includes(props.route.params.cityFrom): false &&
            //props.route.params.cityTo? room.cityTo.includes(props.route.params.cityTo): false
           ||
          room.cityFrom.includes(query)
        );
      })
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchbar}>
          <Image
            source={{
              uri: "https://img.icons8.com/ios/100/undefined/search--v1.png",
            }}
            style={styles.searchbarImg}
          />
          <TextInput
            placeholder="E-mail or Username"
            onChangeText={(value) => {
              if (value && value.length > 0) {
                value = value.trim();
                getResultRooms(value);
              } else {
                setResultRooms([]);
              }
            }}
            style={styles.input}
            placeholderTextColor={"gray"}
          />
        </View>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("Filters")}
          style={styles.filterBtn}
        >
          <Image
            source={require("../assets/filter.png")}
            style={styles.filterImg}
          />
        </TouchableOpacity>
      </View>

      <ScrollView>
        {resultRooms.length ? (
          resultRooms.map((data, idx) => (
            <Post
              post={{
                id: resultRooms[idx].id,
                trip_picture: resultRooms[idx].mainPicture,
                trip:
                  resultRooms[idx].cityFrom + " - " + resultRooms[idx].cityTo,
                caption: resultRooms[idx].travelDate,
                props: props,
              }}
            />
          ))
        ) : (
          <Image
            style={{
              width: 200,
              height: 200,
              alignSelf: "center",
              marginTop: "30%",
            }}
            source={require("../assets/notFound.png")}
          />
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
  header: {
    width: "100%",
    height: 40,
    paddingHorizontal: 5,
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
    marginBottom: 20,
  },
  searchbar: {
    width: "80%",
    color: "gray",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#dadada",
    height: 40,
    borderRadius: 30,
    paddingRight: 15,
  },
  searchbarImg: {
    padding: 10,
    margin: 10,
    marginRight: 15,
    height: 25,
    width: 25,
    resizeMode: "stretch",
    alignItems: "center",
  },
  input: {
    flex: 1,
    backgroundColor: "#dadada",
    borderRadius: 30,
  },
  filterImg: {
    alignSelf: "flex-end",
  },
  filterBtn: {
    alignSelf: "center",
    width: "13%",
  },
});
