
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
  limit,
} from "firebase/firestore";
import Post from "../components/Post";
import { ScrollView } from "react-native-gesture-handler";
import Loading from "../components/Loading";
import DateTimePicker from '@react-native-community/datetimepicker';


export default function NotificationsPage(props) {
  
  const userUid = app.auth().currentUser.uid;

  let [notifications, setNcotifications] = useState([]);
  let [result, setResult] = useState([]);

  let q;

  useEffect(() => {
    let roomId = [];
    const myDoc = doc(db, "User", userUid);

    getDoc(myDoc)
      .then((snapshot) => {
        if (snapshot.exists) {
          roomId = snapshot.data().newMessages;

          q = query(collection(db, "Room"), where("id", "in", roomId));
          onSnapshot(q, (snapshot) => {
            let tempRooms = [];
            snapshot.docs.forEach((room) => {
              //Messages
              q = query(
                collection(db, "Messages"),
                where("roomId", "in", roomId),
                limit(1)
              );
              onSnapshot(q, (snapshot) => {
                //user name
                const userDoc = doc(db, "User", snapshot.docs[0].data().uid);
                getDoc(userDoc).then((user) => {
                  if (user.exists) {
                    const roomDetails = room.data();
                    const combinedDetails = {
                      ...roomDetails,
                      text: snapshot.docs[0].data().text,
                      sendersName: user.data().firstName,
                    };
                    tempRooms.push(combinedDetails);
                  }
                });
              });
            });
            console.log(result);
          });
          setResult(tempRooms);
        } else {
          console.log("No data");
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <RNDateTimePicker mode="time" />
      <Text style={styles.pageNameTxt}>Messages</Text>

      <ScrollView>
        {result ? (
          result.map((data, idx) => (
            <TouchableOpacity
              style={styles.messageBox}
              onPress={() => props.navigation.navigate("TripDetails")}
            >
              <Image
                style={styles.messageImg}
                source={{ uri: result[idx].mainPicture }}
              />
              <View style={styles.txtContainer}>
                <Text style={styles.tripTxt}>
                  {result[idx].cityFrom} - {result[idx].cityTo}
                </Text>
                <Text style={styles.captionTxt}>{result[idx].travelDate}</Text>
                <Text style={styles.messageTxt}>
                  {result[idx].sendersName}: {result[idx].text}
                </Text>
              </View>
              <Text style={styles.timeTxt}>11:30</Text>
            </TouchableOpacity>
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
    padding: 40,
    alignSelf: "center",
  },
  trip: {
    marginLeft: 15,
    width: 70,
    height: 70,
    borderRadius: 50,
  },
  messageBox: {
    width: "100%",
    height: 80,
    paddingHorizontal: 15,
    alignContent: "center",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  messageImg: {
    height: 70,
    width: 70,
    resizeMode: "stretch",
    borderRadius: 100,
  },
  txtContainer: {
    height: "80%",
    marginLeft: 20,
  },
  tripTxt: {
    color: "#8736AA",
    fontWeight: "bold",
  },
  captionTxt: {
    color: "#BFBFBF",
    fontWeight: "500",
  },
  timeTxt: {
    color: "#BFBFBF",
    fontWeight: "500",
    height: "80%",
    position: "absolute",
    right: 0,
    marginRight: 20,
  },
  messageTxt: {
    color: "black",
    fontWeight: "500",
    marginTop: 5,
  },
});
