import firebase from "firebase/compat/app";
//import { firebase } from '@firebase/app';
import "firebase/compat/firestore";
//import "firebase/firestore";
import { addDoc, collection, limit, orderBy, query } from "firebase/firestore";
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
} from "react-native";
import React, { useState, useRef } from "react";
//import Icon from "react-native-ionicons";
//import React from "react";

export default function Chat(props) {
  const auth = getAuth(app);
  const [user] = useAuthState(auth);

  const messagesRef = collection(db, "/Messages");

  const [messages, loadingMessages, error] = useCollectionData(
    query(messagesRef, orderBy("createdAt"), limit(100)),
    {
      idField: "id",
    }
  );

  const [formValue, setFormValue] = useState("");

  const sendMessage = async (e) => {
    if (formValue.trim() != "") {
      e.preventDefault();

      let date = new Date().toUTCString();
      let time = date.substring(17,25);

      const { uid } = auth.currentUser;

      await addDoc(messagesRef, {
        createdAt: date,
        createdAtTime: time, 
        text: formValue,
        uid,
      });

      setFormValue("");
    } else {
      alert("Can't send empty message!");
    }
  };

  function ChatMessage(props) {
    const { createdAtTime, text, uid } = props.message;
    //console.log(createdAt);
    const messageClass = uid === auth.currentUser.uid ? "sent" : "received";
    //<View style={`message ${messageClass}`}>
    return messageClass === "sent" ? (
      <View
        style={styles.receiver}
        // style={[
        //   styles.message,
        //   messageClass == "sent" ? styles.sent : styles.message,
        // ]}
      >
        <Text style={styles.receiverText}>{text}</Text>
        <Text style={styles.time}>{createdAtTime}</Text> 
      </View>
    ) : (
      <View style={styles.sender}>
        <Text style={styles.senderText}>{text}</Text>
        <Text style={styles.senderName}>{auth.currentUser.email}</Text>
        <Text style={styles.time}>{createdAtTime}</Text>
      </View>
    );
  }

  const scrollViewRef = useRef();
  //console.log(messages);
  //console.log(firebase.firestore.FieldValue.serverTimestamp());

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.displayedMessages}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        //COULD ONLY BE FOR ANDROID
        keyboardVerticalOffset={-270}
      >
        <ScrollView contentContainerStyle={{bottom: 0}}>
          {messages &&
            messages.map((msg, msgIndex) => (
              <ChatMessage key={msgIndex} message={msg} />
            ))}
        </ScrollView>
        <View style={styles.footer}>
          <TextInput
            style={styles.textInput}
            placeholder="Write a message..."
            onChangeText={(formValue) => setFormValue(formValue)}
            value={formValue}
          />
          <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
            <Image source={require("../assets/icons8-paper-plane-24.png")} />
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
    // position: "absolute",
  },
  displayedMessages: {
    flex: 1,
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
    bottom: 10,
    //position: "absolute",
    //marginTop: "auto",
  },
});
