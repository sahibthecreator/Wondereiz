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
import Slider from "@react-native-community/slider";

export default function AboutMe(props) {
  const userUid = app.auth().currentUser.uid; 
  let [bio, setBio] = useState("");
  let [preference, setPreference] = useState("");
  let [error, setError] = useState("");
  const [preferredAge, setPreferredAge] = useState("15");

  function Validate() {
    if (bio == "" || preference == "") {
      setError("All fields must be filled in.");
    }
    else if (bio.length < 15) {
      setError("Bio lenght must be over 15 characters.");
    }
    else {
      Update();
      props.navigation.navigate("ProfilePicUpload", {props});
    }
  }

  function Update() {
    const myDoc = doc(db, "User", userUid);

    let docData = {
      preference: preference,
      bio: bio,
      preferredAge: preferredAge
    };

    setDoc(myDoc, docData, { merge: true })
      .then(() => {
        console.log("Profile Updated!");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

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
            style={preference === "male" ? styles.selected : styles.button}
            onPress={(preference) => setPreference("male")}
          >
            <Image style={styles.icon} source={require("../assets/male_icon.png")}/>
            <Text style={styles.btnText}>Male</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={preference === "female" ? styles.selected : styles.button}
            onPress={(preference) => setPreference("female")}
          >
            <Image style={styles.icon} source={require("../assets/female_icon.png")}/>
            <Text style={styles.btnText}>Female</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={preference === "Not specified" ? styles.selected : styles.button}
            onPress={(preference) => setPreference("Not specified")}
          >
            <Text style={styles.btnText}>Not specified</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.sliderTxt}>Age: {preferredAge}</Text>
        <Text style={{ fontSize: 12, marginLeft: 260 }}>15 - 60+</Text>
        <Slider
          style={styles.slider}
          minimumValue={15}
          maximumValue={60}
          minimumTrackTintColor="#bd2aba"
          maximumTrackTintColor="darkgray"
          thumbTintColor="#b61fb5"
          value={1}
          onValueChange={(value) => setPreferredAge(parseInt(value))}
        />
        <TouchableOpacity 
          style={styles.submit} 
          onPress={() => {
            Validate();
        }}>
        <Text style={styles.submitText}>Continue</Text>
        </TouchableOpacity>
        <Text style={styles.errMsg}>{error}</Text>
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
    marginTop: 30,
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
    marginTop: 10,
  },
  bio: {
    marginBottom: 20,
    marginTop: 30,
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
  selected: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 105,
    height: 30,
    margin: 5,
    borderRadius: 15,
    backgroundColor: "#bd2aba",
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
  slider: {
    width: 350, 
    height: 30, 
    alignSelf: 'center',
    marginBottom: 10,
  },
  sliderTxt: {
    fontSize: 12, 
    marginTop: 30,
    marginLeft: 5,
    alignSelf: "flex-start",
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
  errMsg: {
    color: "red",
    marginTop: 10,
  }
});



