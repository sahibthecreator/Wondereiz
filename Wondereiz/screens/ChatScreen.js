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
import { Button, StyleSheet, View, Text } from "react-native";
import { useState } from "react";

export default function Chat(props) {
  const auth = getAuth(app);
  const [user] = useAuthState(auth);

  const messagesRef = collection(db, "/Messages");

  const [messages, loadingMessages, error] = useCollectionData(
    query(messagesRef, orderBy("createdAt"), limit(25)),
    {
      idField: "id",
    }
  );

  const [formValue, setFormValue] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid } = auth.currentUser;

    await addDoc(messagesRef, {
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      text: formValue,
      uid,
    });

    setFormValue("");
  };

  function ChatMessage(props) {
    const { text, uid } = props.message;

    const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

    return (
      <View style={`message ${messageClass}`}>
        <Text>{text}</Text>
      </View>
    );
  }

  //console.log(messages);
  //console.log(firebase.firestore.FieldValue.serverTimestamp());

  return (
    <>
      <View>
        {messages &&
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
      </View>
      <View>
        <TextInput
          style={styles.input}
          placeholder="Your message..."
          onChangeText={(formValue) => setFormValue(formValue)}
          value={formValue}
        />
        <Button title="Send" onPress={sendMessage} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  Text: {
    color: "white",
  },
  input: {
    borderWidth: 1,
    borderColor: "#777",
    padding: 8,
    margin: 10,
    width: 250,
  },
});
