import React, { Component, useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { app, db } from "../Config";
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  getDoc,
  arrayUnion,
  arrayRemove,
  updateDoc,
} from "firebase/firestore";

const userUid = "stIHaXMezOgz97wEPXVZp2gsaXD2";
const roomId = "room3";

export default function Trip_details(props) {
  //console.log("User UID: " + app.auth().currentUser.uid);
  //const userUid = app.auth().currentUser.uid;
  //const roomId = props.navigation.getParam("roomsId", "room1");

  let savedRooms = [""];
  const myDoc = doc(db, "User", userUid);

  let [info, setInfo] = useState([]);
  let [rooms, setRooms] = useState([]);
  let [favourite, setFavourite] = useState(false);
  let [joined, setJoined] = useState(false);
  let [favRooms, setFavRooms] = useState([]);
  let [joinedRooms, setJoinedRooms] = useState([]);
  let [numOfMembers, setNumOfMembers] = useState([]);
  let [joinRooms, setJoinRooms] = useState([]);

  useEffect(() => {
    let qry = query(collection(db, "Room"), where("id", "==", roomId));

    onSnapshot(qry, (snapshot) => {
      let infoRooms = [];
      snapshot.docs.forEach((doc) => {
        infoRooms.push(doc.data());
      });
      setInfo(infoRooms);
      console.log("Room" + info[0]);
    });
  }, []);

  useEffect(() => {
    getDoc(myDoc)
      .then((snapshot) => {
        if (snapshot.exists) {
          let q = query(
            collection(db, "Room"),
            where("membersUserId", "array-contains", userUid),
            where("id", "==", roomId)
          );
          onSnapshot(q, (snapshot) => {
            let savRooms = [];
            snapshot.docs.forEach((doc) => {
              savRooms.push(doc.data());
              console.log(doc.data());
            });
            setNumOfMembers(savRooms);
            console.log("Users:" + numOfMembers[0]);
          });
        } else {
          console.log("No data");
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  useEffect(() => {
    getDoc(myDoc)
      .then((snapshot) => {
        if (snapshot.exists) {
          let qr = query(
            collection(db, "User"),
            where("savedRoomsId", "array-contains", roomId)
          );
          onSnapshot(qr, (snapshot) => {
            let sRooms = [];
            snapshot.docs.forEach((doc) => {
              sRooms.push(doc.data());
            });
            setJoinRooms(sRooms);
            setJoined(true);
          });
        } else {
          console.log("No data");
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  useEffect(() => {
    getDoc(myDoc)
      .then((snapshot) => {
        if (snapshot.exists) {
          let qr = query(
            collection(db, "Room"),
            where("adminUid", "==", userUId),
            where("id", "==", roomId)
          );
          onSnapshot(qr, (snapshot) => {
            let saRooms = [];
            snapshot.docs.forEach((doc) => {
              saRooms.push(doc.data());
            });
            setJoinedRooms(saRooms);
            setJoined(true);
          });
        } else {
          console.log("No data");
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  useEffect(() => {
    getDoc(myDoc)
      .then((snapshot) => {
        if (snapshot.exists) {
          savedRooms = snapshot.data().savedRoomsId;
          //console.log(savedRooms);

          let q = query(collection(db, "Room"), where("id", "in", savedRooms));
          onSnapshot(q, (snapshot) => {
            let tempRooms = [];
            snapshot.docs.forEach((doc) => {
              tempRooms.push(doc.data());
            });
            setFavRooms(tempRooms);
            setFavourite(true);
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
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.exit}
        onPress={() => props.navigation.goBack()}
      >
        <Image source={require("../assets/cross.png")} />
      </TouchableOpacity>
      <View>
        <Image
          style={{
            width: 200,
            height: 200,
            borderRadius: 100,
            position: "relative",
            top: 125,
          }}
          source={{ uri: info[0]?.mainPicture }}
        />
      </View>
      <Text style={styles.header}>
        {info[0]?.cityFrom} - {info[0]?.cityTo}
      </Text>
      <View style={styles.details}>
        <Text style={styles.details_header}>About the trip</Text>
        <Text style={styles.details_text} numberOfLines={5}>
          {info[0]?.description}
        </Text>
      </View>
      <View style={[styles.room]}>
        <View style={styles.date}>
          <Text style={styles.room_header}>Date</Text>
          <Text style={styles.room_text}>{info[0]?.travelDate}</Text>
        </View>
        <View style={styles.time}>
          <Text style={styles.room_header}>Time</Text>
          <Text style={styles.room_text}>{info[0]?.travelTime}</Text>
        </View>
        <View style={styles.members}>
          <Text style={styles.room_header}>Members</Text>
          <Text style={styles.room_text}>
            {numOfMembers[0]?.membersUserId.length}/{info[0]?.maxMembers}
          </Text>
        </View>
        <View style={styles.age}>
          <Text style={styles.room_header}>Age</Text>
          <Text style={styles.room_text}>
            {info[0]?.minAge}-{info[0]?.maxAge}
          </Text>
        </View>
      </View>
      <FavButton />
    </SafeAreaView>
  );
}

const FavButton = ({ favourite }) => {
  const favouriteText = "I like this trip";
  const unfavouriteText = "You liked this trip";

  const [likeText, setLikeText] = useState(unfavouriteText);
  let [savedRoom, setSavedRoom] = useState("");
  useEffect(() => {
    console.log("useEffect called");
    setLikeText(favourite ? favouriteText : unfavouriteText);
  }, []);
  const myDoc = doc(db, "User", userUid);

  function Create() {
    console.log(roomId);

    if (likeText == unfavouriteText) {
      setLikeText(favouriteText);

      updateDoc(myDoc, {
        savedRoomsId: arrayUnion(roomId),
      });
    } else {
      setLikeText(unfavouriteText);

      updateDoc(myDoc, {
        savedRoomsId: arrayRemove(roomId),
      });
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.like}
        favourite={favourite}
        onPress={(savedRoom) => setSavedRoom(roomId) + Create()}
      >
        <Text style={styles.like_text}>{likeText}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const JoinButton = ({ joined }) => {
  const joinText = "Join the trip";
  const unJoinText = "You joined this trip";

  const [joinedText, setJoinedText] = useState(unJoinText);
  let [membersUserId, setMembersUserId] = useState("");
  useEffect(() => {
    console.log("useEffect called");
    console.log("userId:" + userUid);
    setJoinedText(joined ? joinText : unJoinText);
  }, []);
  const myDocR = doc(db, "Room", roomId);

  function Create() {
    console.log(userUId);

    if (joinedText == unJoinText) {
      setJoinedText(joinText);

      updateDoc(myDocR, {
        membersUserId: arrayUnion(userUId),
      });
    } else {
      setJoinedText(unJoinText);

      updateDoc(myDocR, {
        membersUserId: arrayRemove(userUId),
      });
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.join}
        joined={joined}
        onPress={(membersUserId) => setMembersUserId(userUId) + Create()}
      >
        <Text style={styles.join_text}>{joinedText}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  exit: {
    position: "absolute",
    top: 50,
    left: 20,
  },
  header: {
    top: -125,
    color: "#8736AA",
    fontWeight: "bold",
    fontSize: 20,
    position: "relative",
  },
  details: {
    width: 350,
    margin: 5,
    marginBottom: 50,
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
    position: "relative",
    top: 125,
  },
  details_header: {
    alignItems: "flex-start",
    fontSize: 20,
    fontWeight: "bold",
    color: "#4B4B4B",
    marginBottom: 10,
  },
  details_text: {
    color: "#4B4B4B",
    fontSize: 15,
    alignItems: "flex-start",
  },
  room: {
    position: "absolute",
    top: 625,
  },
  date: {
    position: "relative",
    left: -100,
  },
  time: {
    position: "relative",
    right: -125,
    top: -45,
  },
  members: {
    position: "relative",
    left: -100,
  },
  age: {
    position: "relative",
    right: -125,
    top: -45,
  },
  room_header: {
    color: "#606060",
    fontWeight: "bold",
    fontSize: 18,
  },
  room_text: {
    color: "#606060",
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
    position: "absolute",
    bottom: -50,
    left: -210,
  },
  heart: {
    position: "absolute",
    bottom: 40,
    left: 25,
  },
  like_text: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#D50FBC",
    textAlign: "center",
    marginTop: 30,
    marginRight: 25,
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
    backgroundColor: "#D50FBC",
    width: 210,
    height: 100,
    position: "absolute",
    bottom: -300,
    right: -0,
  },
  join_text: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#FFFFFF",
  },
});
