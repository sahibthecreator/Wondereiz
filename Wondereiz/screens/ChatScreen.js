import firebase from "firebase/compat/app";
import "firebase/firestore";
import { collection, orderBy } from "firebase/firestore";
require("firebase/auth");
import { app } from "../Config";
import { db } from "../Config";
import { TextInput } from "react-native-gesture-handler";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useState } from "react/cjs/react.production.min";
import { getAuth, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { StyleSheet } from "react-native";

export default function Chat(props) {
  const auth = getAuth(app);
  const [user] = useAuthState(auth);

  const messagesRef = collection(db, "/Messages");
  const query = orderBy("createdAt");

  const [messages] = useCollectionData(query, { idField: "id" });

  const [formValue, setFormValue] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid } = auth.currentUser;

    await messagesRef.add({
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      text: formValue,
      uid,
    });
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
          onChange={(formValue) => setFormValue(formValue)}
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
