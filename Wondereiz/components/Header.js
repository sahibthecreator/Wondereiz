import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import {
    collection,
    doc,
    getDoc,
    query,
    where,
    onSnapshot,
  } from "firebase/firestore";
import { db } from "../Config"

const Header = () => {
    let [userDoc, setUserDoc] = useState(null);
    let [text, setText] = useState("");


    const ref = collection(db, "User");
    const q = query(ref, where("name", "==", "Sahib"));

    return (
        <View>
            <Text style={styles.title}>Hi, User!</Text>
            {userDoc != null && <Text style={styles.title}>Hi, {userDoc.name}!</Text>}
            <Text style={styles.subtitle}>These are some upcoming trips you might be interest in.</Text>
        </View>
    )
}

const styles = StyleSheet.create({
        title: {
            marginTop: 30, 
            marginLeft: 15, 
            fontSize: 25, 
            color: '#8736AA', 
            fontWeight: 'bold'
        },
        subtitle: {
            marginTop: 10, 
            marginLeft: 15, 
            fontSize: 13, 
            color: '#686868', 
            fontWeight: 'normal'
        }
})

export default Header