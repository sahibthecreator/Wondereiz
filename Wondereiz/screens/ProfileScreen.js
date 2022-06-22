import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import BottomTabs from "../components/BottomTabs";
import { app, db, storage } from "../Config"
import {
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import AgeCalc from "../components/AgeCalc";  
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage"; 
import * as ImagePicker from "expo-image-picker";

export default function Profile(props) {
  let [updatedBio, setUpBio] = useState("");
  let [error, setError] = useState("");
  let [picError, setPicError] = useState("");
  let [firstName, setFirstName] = useState("");
  let [dOb, setDoB] = useState("");
  let [city, setCity] = useState("");
  let [bio, setBio] = useState("");
  let [picture, setPicture] = useState(null);
  let [procentage, setProcentage] = useState("");
  let [refreshing, setRefreshing] = React.useState(false);
  let userUid;

  if(props.currentUser == null) {
    //accessed from nav bar
    userUid = app.auth().currentUser.uid;
  } else {
    //accessed from somewhere else & its just viewing
    userUid = props.currentUser;
  }

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
  
  const onRefresh = React.useCallback(() => {
    setUpBio("");
    setRefreshing(true);
    wait(200).then(() => setRefreshing(false));
  }, []);

  useEffect(() => { 
    const myDoc = doc(db, "User", userUid);

    getDoc(myDoc)
      .then((snapshot) => {
        if (snapshot.exists) {
          setFirstName(snapshot.data().firstName);
          setDoB(snapshot.data().dateOfBirth);
          setCity(snapshot.data().city);
          setBio(snapshot.data().bio);
          setUpBio(bio);
        } 
      })
      .catch((error) => {
        console.log(error);
        return;
      });
      getDownloadURL(imageRef)
      .then((url) => {
        setPicture(url);
      }); 
  },[]);

  const updateBio = () => {
    setError("");
    
    if (bio !== updatedBio) {
    const myDoc = doc(db, "User", userUid);

    let docData = {
      bio: updatedBio,
    };

    setDoc(myDoc, docData, { merge: true })
      .catch((error) => {
        console.log(error);
        return;
      });
    } else {
      setError("Make changes to your bio first!")
    }
  };

  const imageRef = ref(storage, `profilePictures/${userUid}.jpg`);
  const fileName = `${userUid}.jpg`;
    
  let pickImage = async () => {
    let permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permission.granted === false) {
      alert("Permission to access the camera roll is required!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync();

    if (result.cancelled === true) {
      return;
    }

    setError("");
    setProcentage("");
    const img = await fetch(result.uri);
    const blob = await img.blob();
    UploadImage(blob);
  };

  function UploadImage(file) {
    const uploadTask = uploadBytesResumable(imageRef, file)
    uploadTask.on('state_changed',
    (snapshot) => {
      let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setProcentage('Upload is ' + progress + '% done');
    },
    (error) => {
      console.log(error);
      setPicError("Something went wrong, please try again");
      return;
    },
    () => {
      getDownloadURL(imageRef)
      .then((url) => {
        setPicture(url);
      }); 
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
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
                  <TouchableOpacity onPress={() => props.navigation.goBack()}>    
                    <Image style={styles.backIcon} source={require("../assets/arrow.png")} />
                  </TouchableOpacity> 
                  <Text style={styles.captionPartp}>Participant Info</Text>
                </>     
            }
          </View>
          {props.currentUser == null 
            ? 
              <>
                <TouchableOpacity onPress={pickImage}>      
                  {(picture !== null) && <Image style={styles.prof} source={{uri: picture}} />}
                  {(picture === null) && <Image style={styles.prof} source={require("../assets/profilePic.png")} />}
                  <Image style={(picture !== null) ? styles.camera : styles.cameraUnselected} source={require("../assets/camera.png")}/>
                </TouchableOpacity>
                {(picError !== "") && <Text style={{alignSelf: "center", color: "red", marginTop: 3}}>{picError}</Text>}
                {(picture !== null) && <Text style={{alignSelf: "center", marginTop: 5}}>{procentage}</Text>}
              </>
            :
              <>
                {(picture !== null) && <Image style={styles.prof} source={{uri: picture}} />}
                {(picture === null) && <Image style={styles.prof} source={require("../assets/profilePic.png")} />}
              </>
          } 
          <View style={{flexDirection: "row", marginTop: 10}}>
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
          {(props.currentUser == null) &&
            <TouchableOpacity
              style={styles.bttn} 
              onPress={() => updateBio()}
            >
              <Text style={{color: "white"}}>Update Bio</Text>
            </TouchableOpacity>
          }
          {(error !== "") && <Text style={{color: "red"}}>{error}</Text>}
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
  cameraUnselected: {
    width: 50,
    height: 50,
    position: "absolute",
    top: 150,
    left: 195,
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