import React, { Component, useState } from "react";
import { 
    StyleSheet,
    Text,  
    Image,
    TouchableOpacity
  } from 'react-native';
  import { SafeAreaView } from "react-native-safe-area-context";
  import { app, db } from "../Config";
  import { LinearGradient } from "expo-linear-gradient";
  import {
    collection,
    query,
    where,
    onSnapshot,
  } from "firebase/firestore";


  export default function Transition2(props) {
    //console.log("User UID: " + app.auth().currentUser.uid);
    //const userUid = app.auth().currentUser.uid;
    
    /*let [user, setUser] = useState([]);

    let q = query(collection(db,'User', userUid));
    
    onSnapshot(q, (snapshot) => {
      let users = [];
      snapshot.docs.forEach((doc) => {
        users.push(doc.data());
      });
      setUser(users);
      console.log(user);
    });*/
    //let username = app.auth().currentUser.name;
    let username = "Andrey";

    return (
    <LinearGradient colors={["#441B55", "#b61fb5"]} style={styles.background}>
    <SafeAreaView style={styles.container}>
      <Image style={styles.animatedImage}
      source={require("../assets/train.gif")} />
      <Text style={styles.caption_header}>Welcome to Wondereiz {username}!</Text>
      <Text style={styles.caption}>Before starting the adventure tell us what you are looking for!</Text>
      <TouchableOpacity 
      style={styles.button}
      onPress={() => props.navigation.navigate("AboutMe")}>
        <Text style={styles.button_text}>Continue</Text>
      </TouchableOpacity>
    </SafeAreaView>
  </LinearGradient>
);
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    background: {
      width: "100%",
      height: "100%",
      position: "relative",
    },
    animatedImage: {
      height: 30,
      width: "100%",
    },
    caption_header: {
      fontSize: 20,
      color: "#FFFFFF",
      marginTop: 40,
      fontWeight: "bold",
    },
    caption: {
      fontSize: 15,
      color: "#BFBFBF",
      marginTop: 20,
      textAlign: "center",
      width: "75%",

    },
    button: {
      backgroundColor: "#FFFFFF",
      position: "absolute",
      bottom: 20,
      marginBottom: 5,
      padding: 10,
      paddingHorizontal: 100,
      borderRadius: 25,
    },
    button_text: {
      fontWeight: "bold",
      fontSize: 20,
      color: "#5C2573",
    }
})