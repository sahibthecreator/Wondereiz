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
  TouchableOpacity,
  Text,
} from "react-native";
import React, { useState } from "react";
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

      const { uid } = auth.currentUser;

      await addDoc(messagesRef, {
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        text: formValue,
        uid,
      });

      setFormValue("");
    } else {
      alert("Can't send empty message!");
    }
  };

  function ChatMessage(props) {
    const { text, uid } = props.message;

    const messageClass = uid === auth.currentUser.uid ? "sent" : "received";
    //<View style={`message ${messageClass}`}>
    return (
      <View
        style={[
          styles.message,
          messageClass == "sent" ? styles.sent : styles.message,
        ]}
      >
        <Text
          style={messageClass == "sent" ? styles.sentText : styles.receivedText}
        >
          {text}
        </Text>
      </View>
    );
  }

  //console.log(messages);
  //console.log(firebase.firestore.FieldValue.serverTimestamp());

  return (
    <SafeAreaView style={styles.container}>
      <View>
        {messages &&
          messages.map((msg, msgIndex) => (
            <ChatMessage key={msgIndex} message={msg} />
          ))}
      </View>
      <View style={styles.formText}>
        <TextInput
          placeholder="Write a message..."
          onChangeText={(formValue) => setFormValue(formValue)}
          value={formValue}
        />
        <TouchableOpacity style={styles.messageButton} onPress={sendMessage}>
          <Image source={{ uri: "../assets/icons8-paper-plane-24.png" }} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //alignItems: "center",
    justifyContent: "center",
  },
  messageText: {
    color: "red",
  },
  message: {
    display: "flex",
    alignItems: "flex-start",
  },
  sent: {
    flexDirection: "row-reverse",
  },
  sentText: {
    color: "white",
    backgroundColor: "#0b93f6",
    alignSelf: "flex-end",
  },
  receivedText: {
    backgroundColor: "e5e5ea",
    color: "black",
  },
  formText: {
    //marginTop: "auto",
  },
  messageButton: {
    alignItems: "flex-end",
  },
});
