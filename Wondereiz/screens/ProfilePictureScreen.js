import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { app, db, storage } from "../Config";
import {
  doc,
  setDoc,
} from "firebase/firestore";
import * as ImagePicker from "expo-image-picker";
import { ImagePickerCancelledResult } from 'expo-image-picker';
import { ref, uploadBytes, getDownloadURL, deleteObject, deleteMetadata, uploadBytesResumable } from "firebase/storage";
import { ScrollView } from "react-native-gesture-handler";


export default function ProfilePicUpload(props) {
  let userUid = app.auth().currentUser.uid;
  let [image, setImage] = useState(null);
  let [result, setResult] = useState("");
  let [blob, setBlob] = useState("");
  let [error, setError] = useState("");
  let [procentage, setProcentage] = useState("");
  let uri;

  const pickImage = async () => {
    try {
      setResult(await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      }));

      console.log(result);

      if (!result.cancelled) {
          const getUri = await fetch(result.uri);
          setBlob(await getUri.blob());
          setError("");
          setProcentage("");
          uploadImage();   
      } else {
        return;
      }
    } catch (error) {
      setError("Something went wrong, please try again");
      console.info(error);
      return;
    }
  };

    function uploadImage() {
      /*if (image !== null) {
        const deleteRef = ref(storage, `profilePictures/${userUid}`);
      deleteObject(deleteRef)
      .then(() => {
        console.log("Deleted previous file!");
      }).catch((error) => {
        setError("Something went wrong, please try again");
        console.log(error.message);
      });
      }
       */
      
      const fileExtension = result.uri.split('.').pop();
      console.log("EXT: " + fileExtension);

      const fileName = `${userUid}.${fileExtension}`;
      console.log(fileName);
      
      const metadata = {
        type: "image/jpeg"
      }

      const imageRef = ref(storage, `profilePictures/${fileName}`);
      const uploadTask = (uploadBytesResumable(imageRef, blob, metadata));
        uploadTask.on('state_changed',
          (snapshot) => {
            let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProcentage('Upload is ' + progress + '% done');
          }, 
          (error) => {
            console.log(error);
            return;
          },  
          () => {
            console.log("Uploaded to storage!");
            getDownloadURL(uploadTask.snapshot.ref)
              .then((url) => {
                setImage(url);
                console.log(image);
                updateImage();
              }) 
              .catch((error) => {
                console.log(error);
              });
          }
        );  
    } 

    function updateImage() {
      console.log("Creating reference database");
      const myDoc = doc(db, "User", userUid);

      let docData = {
        profilePicture: image
      };

      setDoc(myDoc, docData, { merge: true })
        .then(() => {
          console.log("Refrence updated!");
        })
        .catch((error) => {
          console.log(error);
        }
      );
    }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <ScrollView>
          <View style={{flexDirection: "row"}}>
            <TouchableOpacity onPress={() => props.navigation.navigate('AboutMe')}>
              <Image source={require("../assets/arrow.png")}/>
            </TouchableOpacity>
            <Text style={styles.caption}>Profile Picture</Text>
          </View>
          <View style={{alignItems: "center"}}>
            <TouchableOpacity
              style={{marginTop: 250}} 
              onPress={pickImage}
            > 
              {(image !== null) && <Image style={styles.icon} source={{ uri: image }}/>}
              {(image === null) && <Image style={styles.icon} source={require("../assets/profilePic.png")} />}
            </TouchableOpacity>
            <Text style={styles.pictureTxt}>Upload a picture of yourself!</Text>
            <Text style={{color: "red", marginTop: 10}}>{error}</Text>
            {(image !== null) && <Text>{procentage}</Text>}
          </View>
          <TouchableOpacity 
            style={styles.submit}
            onPress={() => {(image === null) ? setError("Please select an image!") : props.navigation.navigate('Home')}}
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
    fontSize: 20,
    marginLeft: 80,
  },
  icon: {
    borderRadius: 75,
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
    marginTop: 190,
  },
  submitText: {
    color: "white",
    fontSize: 20,
  },
});