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
  getDocs,
} from "firebase/firestore";
import { ScrollView } from "react-native-gesture-handler";
import Loading from "../components/Loading";


export default function NotificationsPage(props) {
  const userUid = app.auth().currentUser.uid;
  let [result, setResult] = useState([]);
  let q;

  useEffect(() => {
    let rooms = [];
    let messages = [];
    let results = [];

    q = query(
      collection(db, "Room"),
      where("membersUserId", "array-contains", userUid)
    );

    getDocs(q).then((snapshot) => {
      snapshot.docs.forEach((e) => {
        rooms.push(e.data());
      });
      Promise.all(rooms).then(() => {
        rooms.forEach((room, i) => {
          q = query(collection(db, "Messages"), where("roomId", "==", room.id));
          onSnapshot(q, (snapshot) => {
            if (snapshot) {
              messages.push({
                ...room,
                text: snapshot.docs[snapshot.docs.length - 1].data().text,
                senderUid: snapshot.docs[snapshot.docs.length - 1].data().uid,
              });
              Promise.all(messages).then(() => {
                const sender = doc(db, "User", messages[i].senderUid);
                getDoc(sender).then((snapshot) => {
                  if (snapshot.exists) {
                    console.log(messages[i].text);
                    results.push({
                      ...messages[i],
                      sendersName: snapshot.data().firstName,
                    });
                    Promise.all(results).then((results) => {
                      setResult(results);
                    });
                  }
                });
              });
            }
          });
        });
      });
    });
  }, []);

  let [rooms, setRooms] = useState([]);
  let [messages, setMessages] = useState([]);

  // useEffect(() => {
  //   let snapshotRooms = [];
  //   q = query(
  //     collection(db, "Room"),
  //     where("membersUserId", "array-contains", userUid)
  //   );
  //   getDocs(q).then((snapshot) => {
  //     if (snapshot) {
  //       snapshot.docs.map((e) => {
  //         snapshotRooms.push(e.data());
  //       });
  //       setRooms(snapshotRooms);
  //     }
  //   });
  // }, []);

  // useEffect(() => {
  //   let snapshotMessages = [];
  //   if (rooms.length == 0) {
  //     return;
  //   }
  //   rooms.forEach((e) => {
  //     console.log(e.id);
  //     q = query(collection(db, "Message"), where("roomId", "==", e.id));
  //     getDoc(q).then((querySnapshot) => {
  //       //console.log(querySnapshot.data());
  //     });
  //   });
  //   //setMessages(snapshotMessages);
  // }, [rooms]);

  // useEffect(() => {
  //   if (messages.length == 0) {
  //     return;
  //   }
  //   messages.forEach((e, i) => {
  //     console.log(e);
  //     // q = query(collection(db, "Message"), where("roomId", "==", e.id));

  //     // getDoc(q).then((querySnapshot) => {
  //     //   rooms[i] += querySnapshot.data();
  //     // });
  //   });
  // }, [messages]);

  //console.log(messages.docs.length);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.pageNameTxt}>Messages</Text>

      <ScrollView>
        {result.length !== 0 ? (
          result.map((data, idx) => (
            <TouchableOpacity
              style={styles.messageBox}
              onPress={() =>
                props.navigation.navigate("ChatScreen", { room: result[idx] })
              }
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
              <Text style={styles.timeTxt}>{result[idx].createdAtTime}</Text>
            </TouchableOpacity>
          ))
        ) : (
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
