import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { app, db, storage } from "../Config";
import { doc, setDoc } from "firebase/firestore";
import * as ImagePicker from "expo-image-picker";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { ScrollView } from "react-native-gesture-handler";


export default function ProfilePicUpload(props) {
  let userUid = app.auth().currentUser.uid;
  let [error, setError] = useState("");
  let [procentage, setProcentage] = useState("");

  const imageRef = ref(storage, `profilePictures/${userUid}.jpg`);
    
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

  const [uri, setUri] = useState(null);

  function UploadImage(file) {
    const uploadTask = uploadBytesResumable(imageRef, file)
    uploadTask.on('state_changed',
    (snapshot) => {
      let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setProcentage('Upload is ' + progress + '% done');
      console.log('Upload is ' + progress + '% done');
    },
    (error) => {
      console.log(error);
      setError("Something went wrong, please try again");
      return;
    },
    () => {
      console.log("Uploaded!");
      getDownloadURL(imageRef)
      .then((url) => {
        setUri(url);
        console.log(url);
        updateImage();
      }); 
    });
  }

  function updateImage() {
    console.log("Creating reference database..");
    const myDoc = doc(db, "User", userUid);

    let docData = {
      profilePicture: uri
    };

    setDoc(myDoc, docData, { merge: true })
      .then(() => {
        console.log("Refrence updated!");
      })
      .catch((error) => {
        console.log(error);
        setError("Something went wrong, please try again");
        return;
      }
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <ScrollView>
          <View style={{flexDirection: "row"}}>
            <TouchableOpacity onPress={() => props.navigation.goBack()}>
              <Image style={{width: 30, height: 30}} source={require("../assets/arrow.png")}/>
            </TouchableOpacity>
            <Text style={styles.caption}>Profile Picture</Text>
          </View>
          <View style={{alignItems: "center"}}>
            <TouchableOpacity
              style={{marginTop: 250}} 
              onPress={pickImage}
            > 
              {(uri !== null) && <Image style={styles.icon} source={{ uri: uri }} />}
              {(uri === null) && <Image style={styles.icon} source={require("../assets/profilePic.png")} />}
              <Image style={styles.camera} source={require("../assets/camera.png")}/>
            </TouchableOpacity>
            <Text style={styles.pictureTxt}>Upload a picture of yourself!</Text>
            <Text style={{color: "red", marginTop: 10}}>{error}</Text>
            {(uri !== null) && <Text>{procentage}</Text>}
          </View>
          <TouchableOpacity 
            style={styles.submit}
            onPress={() => {(uri === null) ? setError("Please select an image!") : props.navigation.navigate('Home')}}
          >
            <Text style={styles.submitText}>Continue</Text>
          </TouchableOpacity>
        </ScrollView>
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
    marginLeft: 30,
    marginRight: 30,
  },
  caption: {
    fontWeight: "bold",
    color: "#8736AA",
    fontSize: 22,
    marginLeft: 80,
  },
  icon: {
    borderRadius: 90,
    width: 180,
    height: 180,
  },
  camera: {
    width: 50,
    height: 50,
    position: "absolute",
    top: 120,
    left: 115,
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
    marginTop: 190,
  },
  submitText: {
    color: "white",
    fontSize: 20,
  },
});