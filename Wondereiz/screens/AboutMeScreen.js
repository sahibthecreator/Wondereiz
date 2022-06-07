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

export default function AboutMe(props) {
  const userUid = app.auth().currentUser.uid; //will change when registration is complete
  let [bio, setBio] = useState("");
  let [preference, setPreference] = useState("");
  let [error, setError] = useState("");

  function Validate() {
    if (bio == "" || preference == "") {
      setError("All fields must be filled in.");
    }
    else if (bio.length < 15) {
      setError("Bio lenght must be over 15 characters.");
    }
    else {
      Create();
      props.navigation.navigate("ProfilePicUpload");
    }
  }

  function Create() {
    const myDoc = doc(db, "User", userUid);

    let docData = {
      name: {preference},
      bio: {bio},
    };

    setDoc(myDoc, docData)
      //handling promises
      .then(() => {
        alert("Profile created");
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  return(
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => props.navigation.navigate('Register')}>
            <Image source={require("../assets/arrow.png")}/>
          </TouchableOpacity>
          <Text style={styles.caption}>About Me</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.bio}>Write about your interests and what kind of travel and what kind of travel buddies you want to meet.</Text>
          <TextInput
            style={styles.input}
            multiline={true}
            numberOfLines={40}
            placeholder="Enter text..." 
            onChangeText={(bio) => setBio(bio)}
            value={bio}
            placeholderTextColor="#70706a"
            autoCapitalize="sentences"
          />
          <Text style={styles.preference}>Who I want to meet</Text>
          <Text style={styles.gender}>Gender</Text>
          <View style={styles.section}>
            <TouchableOpacity
              style={styles.button} 
              onPress={(preference) => setPreference("male")}
            >
              <Image style={styles.icon} source={require("../assets/male_icon.png")}/>
              <Text style={styles.btnText}>Male</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.button} 
              onPress={(preference) => setPreference("female")}
            >
              <Image style={styles.icon} source={require("../assets/female_icon.png")}/>
              <Text style={styles.btnText}>Female</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.button}
              onPress={(preference) => setPreference("Not specified")}
            >
              <Text style={styles.btnText}>Not specified</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.errorMsg}>{error}</Text>
          <TouchableOpacity 
            style={styles.submit} 
            onPress={() => {
              Validate();
            }}>
            <Text style={styles.submitText}>Continue</Text>
          </TouchableOpacity>
        </View> 
      </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    backgroundColor: "white",
  },
  content: {
    alignItems: "center",
    marginLeft: 30,
    marginRight: 30,
  },
  header: {
    flexDirection: "row",
    marginLeft: 30,
    marginRight: 30,
    alignItems: "center",
  },
  caption: {
    fontWeight: "bold",
    color: "#8736AA",
    fontSize: 20,
    marginLeft: 100,
  },
  input: {
    backgroundColor: "#d9d9da",
    width: 330,
    height: 190,
    borderRadius: 22,
  },
  bio: {
    marginBottom: 20,
    fontSize: 17,
  },
  preference: {
    fontWeight: "bold",
    color: "#8736AA",
    marginTop: 50,
    marginBottom: 40,
    fontSize: 20,
  },
  gender: {
    alignSelf: "flex-start",
    fontSize: 17,
    marginBottom: 15,
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 105,
    height: 30,
    backgroundColor: "#d9d9da",
    margin: 5,
    borderRadius: 15,
  },
  icon: {
    width: 18,
    height: 18,
    marginRight: 10,
  },
  btnText: {
    fontSize: 15,
  },
  submit: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#bd2aba",
    borderRadius: 18,
    width: "100%",
    height: 40,
    marginTop: 20,
  },
  submitText: {
   color: "white",
   fontSize: 20,
  },
  errorMsg: {
    color: "red",
    fontWeight: "bold",
    marginTop: 100, // will change when range is added
  },
});



