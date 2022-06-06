import { isEmpty } from "@firebase/util";
import { StatusBar } from "expo-status-bar";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
  query,
  where,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import AppNavigator from "./AppNavigator";
//using DB reference
import { app, db } from "./Config";

export default function App() {
  var [userDoc, setUserDoc] = useState(null);
  var [text, setText] = useState("");


  const ref = collection(db, "User");
  const q = query(ref, where("name", "==", "Jhon"));


  onSnapshot(q, (snapshot) => {
    let users = [];
    snapshot.docs.forEach((doc) => {
      users.push(doc.data());
    });
    console.log(users);
  });

  //CRUD Functions
  const Create = () => {
    const myDoc = doc(db, "MyCollection", "MyDocument");

    let docData = {
      name: "Sahib",
      bio: "Programmer",
    };

    setDoc(myDoc, docData)
      //handling promises
      .then(() => {
        alert("Document created");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const Read = () => {
    const myDoc = doc(db, "MyCollection", "MyDocument");

    getDoc(myDoc)
      //handling promises
      .then((snapshot) => {
        if (snapshot.exists) {
          setUserDoc(snapshot.data());
        } else {
          alert("No data");
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const Update = (value, merge) => {
    // if merge is true it is merging with existing otherwise it will create a new one
    const myDoc = doc(db, "MyCollection", "MyDocument");

    setDoc(myDoc, value, { merge: merge })
      .then(() => {
        alert("Document Updated!");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const Delete = () => {
    const myDoc = doc(db, "MyCollection", "MyDocument");

    deleteDoc(myDoc)
      .then(() => {
        alert("Document Deleted!");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <AppNavigator></AppNavigator>

    // <View style={styles.container}>

    //   {userDoc != null && <Text>Hi, {userDoc.name}!</Text>}
    //   <Button title="Create new doc" onPress={Create} />
    //   <Button title="Read" onPress={Read} />

    //   <TextInput
    //     placeholder="New data here"
    //     style={styles.input}
    //     onChangeText={(text) => setText(text)}
    //     value={text}
    //   />

    //   <Button
    //     title="Update"
    //     onPress={() => {
    //       //brackets are very important!!!!
    //       Update(
    //         {
    //           bio: text,
    //         },
    //         false
    //       );
    //     }}
    //     disabled={text == ""}
    //   />

    //   <Button title="Delete" onPress={Delete} />

    //   <StatusBar style="auto" />
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: "80%",
    marginTop: 25,
    padding: 12,
    fontSize: 18,
    borderWidth: 0.2,
    borderRadius: 10,
    borderColor: "gray",
  },
});
