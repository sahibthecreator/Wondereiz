import React, { Component, useState } from "react";
import {
  Button,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { app, db } from "../Config"
import {
  doc,
  setDoc,
} from "firebase/firestore";

export default function ProfilePicUpload(props) {

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={{flexDirection: "row"}}>
          <TouchableOpacity onPress={() => props.navigation.navigate('AboutMe')}>
          <Image source={require("../assets/arrow.png")}/>
          </TouchableOpacity>
          <Text style={styles.caption}>Profile Picture</Text>
        </View>
        <View style={{alignItems: "center"}}>
          <Image style={styles.icon} source={require("../assets/profilePic.png")}/>
          <Text style={styles.pictureTxt}>Upload a picture of yourself!</Text>
        </View>
        <TouchableOpacity 
          style={styles.submit}
        >
          <Text style={styles.submitText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    backgroundColor: "white",
  },
  content: {
    marginLeft: 30,
    marginRight: 30,
  },
  caption: {
    fontWeight: "bold",
    color: "#8736AA",
    fontSize: 20,
    marginLeft: 80,
  },
  icon: {
    marginTop: 230,
    borderRadius: 15,
    width: 150,
    height: 150,
  },
  pictureTxt: {
    color: "grey",
    marginTop: 15,
  },
  submit: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#bd2aba",
    borderRadius: 18,
    width: "100%",
    height: 40,
    marginTop: 230,
  },
  submitText: {
    color: "white",
    fontSize: 20,
  },
});