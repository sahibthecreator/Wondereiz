import "firebase/compat/firestore";
import { addDoc, collection, limit, orderBy, query, where } from "firebase/firestore";
require("firebase/auth");
import { app } from "../Config";
import { db } from "../Config";
import { TextInput } from "react-native-gesture-handler";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { getAuth, signInWithPopup } from "firebase/auth";
import {
  Button,
  Image,
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Text,
  Modal,
} from "react-native";
import React, { useState, useRef } from "react";

import * as ImagePicker from "expo-image-picker";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
//import Icon from "react-native-ionicons";
//import React from "react";

export default function Chat(props) {
  const auth = getAuth(app);
  const [user] = useAuthState(auth);
  const storage = getStorage(app);
  let roomId = props.route.params.room.id;

  // Create a reference to 'mountains.jpg'
  const imageRef = ref(storage, "chat/Landscape.jpg");

  const messagesRef = collection(db, "/Messages");
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedImagePreview, setSelectedImagePreview] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [messages, loadingMessages, error] = useCollectionData(
    query(messagesRef, where("roomId", "==", roomId), orderBy("createdAt"), limit(100)),
    {
      idField: "id",
    }
  );

  const [formValue, setFormValue] = useState("");

  const sendMessage = async (e) => {
    if (formValue.trim() != "" || selectedImage !== null) {
      //e.preventDefault();

      let date = new Date();
      date.setTime(date.getTime() + (2 * 60 * 60 * 1000));
      date = date.toUTCString();
      
      let time = date.substring(17, 25);

      const { uid } = auth.currentUser;

      await addDoc(messagesRef, {
        createdAt: date,
        createdAtTime: time,
        roomId,
        text: formValue,
        uid,
        image: "Landscape.jpg",
      });

      setFormValue("");
    } else {
      alert("Can't send empty message!");
    }
  };

  let openImagePickerAsync = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.cancelled === true) {
      return;
    }

    const img = await fetch(pickerResult.uri);
    setSelectedImagePreview(img);
    const bytes = await img.blob();
    setSelectedImage(bytes);
    //console.log(bytes);
    setModalVisible(!modalVisible);
  };

  function SendImage(file) {
    uploadBytes(imageRef, file).then((snapshot) => {
      console.log("Uploaded file!");
    });
    sendMessage();
    setModalVisible(!modalVisible);
  }

  function ChatMessage(props) {
    const { createdAtTime, text, uid, image } = props.message;
    const [uri, setUri] = useState(null);
    if (image) {
      getDownloadURL(ref(storage, "chat/" + image)).then((url) => {
        setUri(url);
        //console.log(uri);
      });
    }
    //console.log(createdAt);
    const messageClass = uid === auth.currentUser.uid ? "sent" : "received";
    //<View style={`message ${messageClass}`}>
    return messageClass === "sent" ? (
      <View>
        {text == "" ? ( // Image reciever container
          <View style={styles.receiverImage}>
            <Image
              style={{
                width: 300,
                height: 400,
                resizeMode: "contain",
              }}
              source={{ uri: uri }}
            />
            <Text style={styles.time}>{createdAtTime}</Text>
          </View>
        ) : (
          //Text reciever container
          <View style={styles.receiver}>
            <Text style={styles.receiverText}>{text}</Text>
            <Text style={styles.time}>{createdAtTime}</Text>
          </View>
        )}
      </View>
    ) : (
      <View>
        {text == "" ? (
          <View style={styles.imageSender}>
            <Image
              style={{
                width: 300,
                height: 400,
                resizeMode: "contain",
              }}
              source={{ uri: uri }}
            />
            <Text style={styles.senderName}>{auth.currentUser.email}</Text>
            <Text style={styles.time}>{createdAtTime}</Text>
          </View>
        ) : (
          <View style={styles.sender}>
            <Text style={styles.senderText}>{text}</Text>
            <Text style={styles.senderName}>{auth.currentUser.email}</Text>
            <Text style={styles.time}>{createdAtTime}</Text>
          </View>
        )}
      </View>
    );
  }

  const scrollViewRef = useRef();
  //console.log(messages);
  //console.log(firebase.firestore.FieldValue.serverTimestamp());

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainHeader}>
        <TouchableOpacity
          onPress={() => props.navigation.goBack()}
          style={styles.backBtn}
        >
          <Image
            source={{
              uri: "https://img.icons8.com/ios-filled/50/undefined/back.png",
            }}
            style={{ flex: 1 }}
          />
        </TouchableOpacity>
        <Text style={styles.headerTxt} onPress={() => props.navigation.navigate("GroupInfoScreen", { props, roomId })}>
          {props.route.params.room.cityFrom} - {props.route.params.room.cityTo}
        </Text>
        <Image style={{ width: 50, height: 50, borderRadius: 40 }} source={{ uri: props.route.params.room.mainPicture }} />
      </View>
      <KeyboardAvoidingView
        style={styles.displayedMessages}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        //COULD ONLY BE FOR ANDROID
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -290}
      >
        <ScrollView contentContainerStyle={{ bottom: 0 }}>
          {messages &&
            messages.map((msg, msgIndex) => (
              <ChatMessage key={msgIndex} message={msg} />
            ))}
        </ScrollView>
        <View style={styles.footer}>
          <TouchableOpacity
            onPress={openImagePickerAsync}
            style={styles.imageBtn}
          >
            <Image
              style={{ flex: 1 }}
              source={{
                uri: "https://img.icons8.com/external-tanah-basah-glyph-tanah-basah/48/undefined/external-photo-multimedia-tanah-basah-glyph-tanah-basah.png",
              }}
            />
          </TouchableOpacity>
          <View style={styles.imageModal}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
              }}
            >
              <SafeAreaView
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: "white",
                }}
              >
                <View style={styles.header}>
                  <TouchableOpacity>
                    <Image
                      style={{ width: 30, height: 30, marginHorizontal: 10 }}
                      source={{
                        uri: "https://img.icons8.com/ios/50/undefined/back--v1.png",
                      }}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      right: 0,
                      position: "absolute",
                      margin: 10,
                      marginHorizontal: 20,
                    }}
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <Image
                      style={{ width: 30, height: 30 }}
                      source={{
                        uri: "https://img.icons8.com/ios/50/undefined/delete-sign--v1.png",
                      }}
                      onPress={() => setModalVisible(!modalVisible)}
                    />
                  </TouchableOpacity>
                </View>

                <View style={styles.main}>
                  <Image
                    style={{
                      width: "100%",
                      height: "100%",
                      resizeMode: "contain",
                    }}
                    source={selectedImagePreview}
                  />
                </View>

                <View style={styles.Modalfooter}>
                  <TouchableOpacity onPress={() => SendImage(selectedImage)}>
                    <Image
                      style={{ width: 70, height: 70 }}
                      source={{
                        uri: "https://img.icons8.com/color/78/undefined/send-letter--v1.png",
                      }}
                      onPress={() => SendImage(selectedImage)}
                    />
                  </TouchableOpacity>
                </View>
              </SafeAreaView>
            </Modal>
          </View>

          <TextInput
            style={styles.textInput}
            placeholder="Write a message..."
            onChangeText={(formValue) => setFormValue(formValue)}
            value={formValue}
          />
          <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
            <Image
              style={{ height: 30, width: 30 }}
              source={{
                uri: "https://img.icons8.com/ios/100/undefined/paper-plane.png",
              }}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    //flexDirection: "column",
    //alignItems: "center",
    //justifyContent: "space",
    //flexWrap: "wrap"
  },
  messageText: {
    color: "red",
  },
  message: {
    // display: "flex",
    // alignItems: "flex-start",
    padding: 15,
    backgroundColor: "#ECECEC",
    borderRadius: 20,
    marginRight: 15,
    marginBottom: 20,
    maxWidth: "80%",
    position: "relative",
  },
  receiver: {
    padding: 15,
    backgroundColor: "#ECECEC",
    alignSelf: "flex-end",
    borderRadius: 20,
    marginRight: 15,
    marginBottom: 20,
    maxWidth: "80%",
    position: "relative",
  },
  sender: {
    padding: 15,
    backgroundColor: "#2B68E6",
    alignSelf: "flex-start",
    borderRadius: 20,
    margin: 15,
    maxWidth: "80%",
    position: "relative",
  },
  imageSender: {
    padding: 2,
    backgroundColor: "#2B68E6",
    alignSelf: "flex-start",
    borderRadius: 20,
    margin: 15,
    maxWidth: "80%",
    position: "relative",
  },
  sent: {
    flexDirection: "row-reverse",
  },
  senderText: {
    color: "white",
    fontWeight: "500",
    fontSize: 16,
    marginLeft: 10,
    marginBottom: 15,
    // backgroundColor: "#0b93f6",
    // alignSelf: "flex-end",
  },
  receiverText: {
    //backgroundColor: "#e5e5ea",
    color: "black",
    fontWeight: "500",
    fontSize: 16,
    marginLeft: 10,
  },
  time: {
    fontSize: 11,
    position: "absolute",
    alignSelf: "flex-end",
    marginHorizontal: 10,
  },
  displayedMessages: {
    flex: 1,
    //bottom: 100
    //justifyContent: "flex-start",
    //position: "relative",
  },
  textInput: {
    bottom: 0,
    height: 40,
    flex: 1,
    marginRight: 15,
    backgroundColor: "#ECECEC",
    padding: 10,
    color: "grey",
    borderRadius: 30,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 15,

    //justifyContent: "flex-end",
    //marginBottom: 0,
    //position: "absolute",
    //marginTop: "auto",
  },
  imageBtn: {
    height: 30,
    width: 30,
  },
  header: {
    height: 30,
    padding: 10,
    flexDirection: "row",
  },
  main: {
    width: "100%",
    height: "87%",
    marginTop: 20,
    justifyContent: "center",
    borderTopWidth: 0.4,
  },
  Modalfooter: {
    width: "100%",
    height: "13%",
    alignItems: "flex-end",
    padding: 10,
    borderTopWidth: 0.4,
  },
  receiverImage: {
    padding: 2,
    backgroundColor: "#ECECEC",
    alignSelf: "flex-end",
    borderRadius: 20,
    marginRight: 15,
    marginBottom: 20,
    maxWidth: "80%",
    position: "relative",
  },
  mainHeader: {
    height: "13%",
    width: "100%",
    padding: 20,
    paddingTop: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    top: 0,
    position: "absolute",
    zIndex: 1,
  },
  backBtn: {
    width: 20,
    height: 20,
  },
  headerTxt: {
    color: "#b61fb5",
    fontWeight: "600",
    fontSize: 20,
  },
});
