import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, StyleSheet, Image, TouchableOpacity } from "react-native";
import {
  collection,
  query,
} from "firebase/firestore";
import { ScrollView } from "react-native";
//import { TouchableOpacity } from "react-native-gesture-handler";
import { db, app } from "../Config";
import "firebase/compat/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import PartecipantBox from "../components/PartecipantBox"
import Loading from "../components/Loading";
import DisplayPartecipantBox from "../components/PartecipantBox";


export default function GroupInfoScreen(props) {
  //let [partecipant, setPartecipant] = useState([]);
  let [partecipant_picture, setPartecipantPicture] = useState([]);

  const userUid = app.auth().currentUser.uid;

  const ref = collection(db, "User", userUid);

  //console.log(props.route.params.props.route.params.room.id)
  console.log(props)
  const q = query(ref);

  const [partecipants] = useCollectionData(query(ref));


  function DisplayPartecipants(props) {
    const { username, profilePicture } = props.partecipant;

    return (
      <PartecipantBox post={{
        partecipant_picture: profilePicture,
        caption: username,
      }
      } />
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
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
      <View>
        <Image
          source={{ uri: props.route.params.props.route.params.room.mainPicture }}
          style={styles.groupImg}
        />
        <Text style={{
          color: "#8736AA",
          fontSize: 18,
          fontWeight: '500',
          marginLeft: 100,
          marginTop: 30
        }}>
          {props.route.params.props.route.params.room.cityFrom} - {props.route.params.props.route.params.room.cityTo}
        </Text>
        <Text style={{
          color: "#BFBFBF",
          fontSize: 13,
          fontWeight: '500',
          marginLeft: 155,
          marginTop: 8
        }}>
          {props.route.params.props.route.params.room.travelDate}
        </Text>
      </View>

      <View style={styles.divider} />

      <ScrollView>
        <Text style={{
          color: "#8736AA",
          fontSize: 18,
          fontWeight: '500',
          marginLeft: 30,
          marginTop: 35
        }}>
          {partecipants?.length} Partecipants
        </Text>

        <View style={styles.partecipants}>
          {partecipants ?

            <View>
              <TouchableOpacity onPress={() => props.navigation.navigate("Profile", { props })}>
                <Image
                  source={{
                    uri: "https://img.icons8.com/ios-glyphs/30/D50FBC/back.png",
                  }}
                  style={styles.icon}
                />
              </TouchableOpacity>
              {partecipants && partecipants.map((prt, prtIndex) => (<DisplayPartecipants key={prtIndex} partecipant={prt} />))}
            </View>
            : (
              <Loading />
            )}
        </View>
        <View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  icon: {
    height: 30,
    width: 30,
    marginTop: 20,
    marginLeft: 15
  },
  groupImg: {
    marginLeft: 140,
    marginTop: 20,
    width: 130,
    height: 130,
    borderRadius: 70
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
    shadowOpacity: 0.40,
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
    position: "relative"
  },

});
