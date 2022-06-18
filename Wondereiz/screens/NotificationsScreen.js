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
import { ScrollView } from "react-native-gesture-handler";
import Loading from "../components/Loading";

export default function NotificationsPage(props) {
  const userUid = app.auth().currentUser.uid;

  let [notifications, setNcotifications] = useState([]);
  let [result, setResult] = useState([]);

  let q;

  // useEffect(() => {
  //   let roomId = [];
  //   const myDoc = doc(db, "User", userUid);
  //   let tempRooms = [];

  //   getDoc(myDoc) // Getting notifications array from user based on userUid
  //     .then((snapshot) => {
  //       if (snapshot.exists) {
  //         roomId = snapshot.data().newMessages;
  //         console.log("RoomId " + roomId);

  //         q = query(collection(db, "Room"), where("id", "in", roomId)); // getting room details based on room id
  //         onSnapshot(q, (snapshot) => {
  //           snapshot.docs.forEach((room) => {
  //             console.log("----------------------------------------");
  //             console.log("room Details " + room.data().id);

  //             q = query(
  //               collection(db, "Messages"),
  //               where("roomId", "==", room.data().id),
  //               limit(1)
  //             );
  //             onSnapshot(q, (snapshot) => {
  //               // getting messages which belongs to room id
  //               console.log("----------------------------------------");
  //               console.log(
  //                 "Message Details user id :  " + snapshot.docs[0].data().uid
  //               );

  //               //user name
  //               const userDoc = doc(db, "User", snapshot.docs[0].data().uid);
  //               getDoc(userDoc).then((user) => {
  //                 if (user.exists) {
  //                   console.log("----------------------------------------");
  //                   console.log("Sender name :  " + user.data().firstName);
  //                   const roomDetails = room.data();
  //                   const combinedDetails = {
  //                     ...roomDetails,
  //                     text: snapshot.docs[0].data().text,
  //                     sendersName: user.data().firstName,
  //                   };
  //                   tempRooms.push(combinedDetails);
  //                   console.log("----------------------------------------");
  //                   setResult(tempRooms);
  //                   console.log(result);
  //                 }
  //               });
  //             });
  //           });
  //         });
  //       } else {
  //         console.log("No data");
  //       }
  //     })
  //     .then(() => {
  //       //console.log(result);
  //     })
  //     .catch((error) => {
  //       console.log(error.message);
  //     });
  // }, []);

  useEffect(() => {
    let roomIds = [];
    const myDoc = doc(db, "User", userUid);
    let tempRooms = [];
    getDoc(myDoc).then((snapshot) => {
      roomIds = snapshot.data().newMessages;
      q = query(collection(db, "Room"), where("id", "in", roomIds));
      onSnapshot(q, (roomSnapshot) => {
        roomSnapshot.docs.forEach((room) => {
          q = query(
            collection(db, "Messages"),
            where("roomId", "==", room.data().id)
          );
          onSnapshot(q, (messageSnapshot) => {
            getDoc(doc(db, "User", messageSnapshot.docs[0].data().uid)).then(
              (senderUserSnapshot) => {
                const combinedResult = {
                  mainPicture: room.data().mainPicture,
                  cityFrom: room.data().cityFrom,
                  cityTo: room.data().cityTo,
                  travelDate: room.data().travelDate,
                  sendersName: senderUserSnapshot.data().firstName,
                  text: messageSnapshot.docs[0].data().text,
                  createdAtTime: messageSnapshot.docs[0].data().createdAtTime
                }
                tempRooms.push(combinedResult);
                console.log(tempRooms);
                setResult(tempRooms)
              });
          });
        });
      });
    });
    //setResult(tempRooms);
  }, []);
  
  // useEffect(() => {
  //   let roomIds = [];
  //   const myDoc = doc(db, "User", userUid);
  //   let tempRooms = [];
  //   getDoc(myDoc)
  //   .then((snapshot) => {
  //     roomIds = snapshot.data().newMessages;
  //     roomIds.forEach((e, indx) => {
  //       console.log("-------------");
  //       console.log(e);
  //       q = query(collection(db, "Room"), where("id", "==", e));
  //       onSnapshot(q, (roomSnapshot) => {
  //         //console.log(roomSnapshot);
  //         const room = roomSnapshot.docs[0];
  //         //console.log(room.data());
  //           q = query(
  //             collection(db, "Messages"),
  //             where("roomId", "==", room.data().id)
  //           );
  //           onSnapshot(q, (messageSnapshot) => {
  //             getDoc(doc(db, "User", messageSnapshot.docs[0].data().uid)).then(
  //               (senderUserSnapshot) => {
  //                 const combinedResult = {
  //                   mainPicture: room.data().mainPicture,
  //                   cityFrom: room.data().cityFrom,
  //                   cityTo: room.data().cityTo,
  //                   travelDate: room.data().travelDate,
  //                   sendersName: senderUserSnapshot.data().firstName,
  //                   text: messageSnapshot.docs[0].data().text,
  //                   createdAtTime: messageSnapshot.docs[0].data().createdAtTime,
  //                 };
  //                 tempRooms.push(combinedResult);
  //                 //console.log(tempRooms);
  //               }
  //             );
  //           });
  //       });
  //     });
  //   })
  //   .then(() =>{
  //     console.log(tempRooms);
  //     setResult(tempRooms);
  //   })

  // }, []);

  return (
    <SafeAreaView style={styles.container}>
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
