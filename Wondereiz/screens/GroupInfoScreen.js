import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import {
  where,
  doc,
  getDoc,
  getDocs,
  collection,
  query,
  onSnapshot,
} from "firebase/firestore";
import { ScrollView } from "react-native";
//import { TouchableOpacity } from "react-native-gesture-handler";
import { db, app } from "../Config";
import "firebase/compat/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import PartecipantBox from "../components/PartecipantBox";
import Loading from "../components/Loading";
import DisplayPartecipantBox from "../components/PartecipantBox";

export default function GroupInfoScreen(props) {
  let [partecipant_picture, setPartecipantPicture] = useState([]);
  let roomId = props.route.params.roomId;
  let [userIds, setUserIds] = useState([]);
  let [users, setUsers] = useState([]);

  let queryRoom = query(collection(db, "Room"), where("id", "==", roomId));

  useEffect(() => {
    getDocs(queryRoom).then((snapshot) => {
      snapshot.docs.forEach((e) => {
        setUserIds(e.data().membersUserId);
      });
    });
  }, []);

  useEffect(() => {
    let tempUsers = [];

    userIds.forEach((userId) => {
      let userDoc = doc(db, "User", userId);
      getDoc(userDoc).then((snapshot) => {
        if (snapshot.exists) {
          tempUsers.push(snapshot.data());
          console.log("Query works for users!!!");
        }
      });
    });
    setUsers(tempUsers);
    //console.log(users);
  }, []);

  userIds.forEach((userId) => {
    console.log("This should be each id: " + userId);
  });

  users.forEach((user) => {
    console.log("Users are: " + user.firstName);
    console.log("Users profile picture is: " + user.profilePicture);
  });

  const PartecipantBox = ({ post }) => {
    return (
      <View style={styles.partecipantBoxContainer}>
        <PartecipantBoxHeader post={post} />
        <TouchableOpacity
          onPress={() => props.navigation.navigate("Profile", { props })}
        >
          <Image
            source={{
              uri: "https://img.icons8.com/ios-glyphs/30/D50FBC/back.png",
            }}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const PartecipantBoxHeader = ({ post }) => (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          source={{ uri: post.partecipant_picture }}
          style={styles.partecipantBox}
        />
        <Text
          style={{
            color: "#4B4B4B",
            fontWeight: "500",
            fontSize: 18,
            marginLeft: 35,
            marginTop: 10,
          }}
        >
          {post.caption}
        </Text>
      </View>
    </View>
  );

  //console.log(props);
  const ref = collection(db, "User");

  const [partecipants] = useCollectionData(query(ref));

  function DisplayPartecipants(props) {
    const { username, profilePicture } = props.partecipant;

    return (
      <PartecipantBox
        post={{
          partecipant_picture: profilePicture,
          caption: username,
        }}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Image
            source={{
              uri: "https://img.icons8.com/ios-glyphs/30/D50FBC/back.png",
            }}
            style={styles.backIcon}
          />
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "column" }}>
        <Image
          source={{
            uri: props.route.params.props.route.params.room.mainPicture,
          }}
          style={styles.groupImg}
        />
        <Text
          style={{
            color: "#8736AA",
            fontSize: 18,
            fontWeight: "500",
            marginLeft: 120,
            marginTop: 25,
          }}
        >
          {props.route.params.props.route.params.room.cityFrom} -{" "}
          {props.route.params.props.route.params.room.cityTo}
        </Text>
        <Text
          style={{
            color: "#BFBFBF",
            fontSize: 13,
            fontWeight: "500",
            marginLeft: 145,
            marginTop: 8,
          }}
        >
          {props.route.params.props.route.params.room.travelDate}
        </Text>
      </View>

      <View style={styles.divider} />

      <ScrollView>
        <Text
          style={{
            color: "#8736AA",
            fontSize: 18,
            fontWeight: "500",
            marginLeft: 30,
            marginTop: 35,
          }}
        >
          {partecipants?.length} Partecipants
        </Text>

        <View style={styles.partecipants}>
          {partecipants ? (
            <View>
              {partecipants &&
                partecipants.map((prt, prtIndex) => (
                  <DisplayPartecipants key={prtIndex} partecipant={prt} />
                ))}
            </View>
          ) : (
            <Loading />
          )}
        </View>
        <View></View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  backIcon: {
    height: 30,
    width: 30,
    marginTop: 20,
    marginLeft: 15,
  },
  groupImg: {
    marginLeft: 140,
    marginTop: 20,
    width: 130,
    height: 130,
    borderRadius: 70,
  },
  divider: {
    marginTop: 45,
    borderBottomColor: "white",
    borderBottomWidth: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3.84,
    elevation: 5,
  },
  partecipants: {
    top: 0,
    margin: 30,
    borderRadius: 30,
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
  },
  partecipantBox: {
    width: 50,
    height: 50,
    marginLeft: 10,
    marginTop: 15,
    borderRadius: 40,
    flexDirection: "row",
  },
  icon: {
    height: 30,
    width: 30,
    marginBottom: -50,
    marginTop: -40,
    marginRight: 20,
    marginLeft: 300,
    transform: [{ scaleX: -1 }],
    alignItems: "center",
  },
  partecipantBoxContainer: {
    marginBottom: 30,
    alignItems: "stretch",
  },
});
