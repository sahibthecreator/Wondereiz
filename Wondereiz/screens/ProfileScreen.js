import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import BottomTabs from "../components/BottomTabs";
import { app, db } from "../Config"
import {
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import AgeCalc from "../components/AgeCalc";   

export default function Profile(props) {
  let [updatedBio, setUpBio] = useState("");
  let [error, setError] = useState("");
  let [firstName, setFirstName] = useState("");
  let [dOb, setDoB] = useState("");
  let [city, setCity] = useState("");
  let [bio, setBio] = useState("");
  let userUid;

  if(props.currentUser == null) {
    //accessed from nav bar
    userUid = app.auth().currentUser.uid;
  } else {
    console.log(props.currentUser)
      //accessed from somewhere else & its just viewing
      userUid = props.currentUser;
  }

  useEffect(() => { 
    const myDoc = doc(db, "User", userUid);

    getDoc(myDoc)
      .then((snapshot) => {
        if (snapshot.exists) {
          console.log(snapshot.data());
          setFirstName(snapshot.data().firstName);
          setDoB(snapshot.data().dateOfBirth);
          setCity(snapshot.data().city);
          setBio(snapshot.data().bio);
          setUpBio(bio);
        } else {
          console.log("No data");
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  },[]);

  const updateBio = () => {
    console.log("bio: "+bio);
    console.log("updatedBio: "+updateBio);
    setError("");
    
    if (bio !== updatedBio) {
    const myDoc = doc(db, "User", userUid);

    let docData = {
      bio: updatedBio,
    };

    setDoc(myDoc, docData, { merge: true })
      .then(() => {
        console.log("Document Updated!");
      })
      .catch((error) => {
        console.log(error.message);
      });
    } else {
      setError("Make changes to your bio first!")
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.content}>
          <View style={{flexDirection: "row"}}>
            {props.currentUser == null 
              ? 
                <>
                  <Text style={styles.caption}>User</Text>
                  <TouchableOpacity onPress={() => props.navigation.navigate("CreateTrip")}>
                    <Image style={styles.icon} source={require("../assets/plus.png")} />
                  </TouchableOpacity>
                </> 
              : 
                <>                              
                  <TouchableOpacity onPress={() => props.navigation.navigate("TripDetails")}>    
                    <Image style={styles.backIcon} source={require("../assets/arrow.png")} />
                  </TouchableOpacity> 
                  <Text style={styles.captionPartp}>Participant Info</Text>
                </>
                
            }
          </View>
          <TouchableOpacity>      
            <Image style={styles.prof} source={require("../assets/amsterdam.png")} />
            <Image style={styles.camera} source={require("../assets/camera.png")}/>
          </TouchableOpacity>
          <View style={{flexDirection: "row", marginTop: 20}}>
            <Text style={{marginRight: 10, fontWeight: "bold", fontSize: 27, marginBottom: 5}}>{firstName}</Text>
            <Text style={{fontSize: 27}}>{(AgeCalc(dOb))}</Text>
          </View>
          <Text>placeholder</Text>
          <View style={{flexDirection: "row", marginBottom: 15, marginTop: 10}}>
            <Image style={styles.location} source={require("../assets/location.png")} />
            <Text style={{alignSelf: "center", fontSize: 15}}>{city}</Text>
          </View>
        </View>
        <View
          style={{
            borderBottomWidth: 1,
            borderColor: "#cacaca"
          }}
        />
        <View style={styles.content}>
          <View style={styles.box}>
            <Text style={styles.bio}>About me</Text>
            {props.currentUser == null 
              ?
                <TextInput
                  style={{marginLeft: 10, marginRight: 10, fontSize: 15}}
                  multiline={true}
                  placeholder={bio} 
                  onChangeText={(updatedBio) => setUpBio(updatedBio)}
                  value={updatedBio}
                  placeholderTextColor="#70706a"
                  autoCapitalize="sentences"
                />
              :
                <Text style={{marginLeft: 10, marginRight: 10}}>{bio}</Text>
            }
          </View>
          {props.currentUser == null 
            ? 
              <TouchableOpacity
                style={styles.bttn} 
                onPress={() => updateBio()}
              >
                <Text style={{color: "white"}}>Update Bio</Text>
              </TouchableOpacity>
            :
              <></>
          }
          <Text style={{color: "red"}}>{error}</Text>
        </View>
      </ScrollView>
      <BottomTabs navigation={props.navigation}></BottomTabs>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  content: {
    marginLeft: 30,
    marginRight: 30,
  },
  caption: {
    alignSelf: "center",
    fontSize: 20,
    color: "#bd2aba",
    marginLeft: 150,
  },
  captionPartp: {
    alignSelf: "center",
    fontSize: 20,
    color: "#bd2aba",
    marginLeft: 70,
  },
  prof: {
    width: 200,
    height: 200,
    borderRadius: 100,
    alignSelf: "center",
    marginTop: 20,
  },
  info: {
    marginRight: 10
  },
  backIcon: {
    width: 30,
    height: 30,
    marginTop: 20,
    marginBottom: 15,
  },
  icon: {
    width: 30,
    height: 30,
    marginLeft: 120,
    marginTop: 20,
    marginBottom: 15,
  },
  camera: {
    width: 50,
    height: 50,
    position: "absolute",
    top: 170,
    left: 210,
  },
  location: {
    width: 28,
    height: 28,
    marginRight: 3,
    right: 4,
  },
  box: {
    marginTop: 30,
    borderColor: "#cacaca",
    borderRadius: 20,
    borderWidth: 1,
    padding: 3,
  },
  bio: {
    marginTop: 10,
    marginBottom: 10, 
    marginLeft: 10, 
    fontWeight: "bold",
    fontSize: 20,
  },
  bttn: {
    marginTop: 10,
    backgroundColor: "#bd2aba",
    width: 100,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 18,
    height: 30,
  }
});