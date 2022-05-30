import React, { Component, useState } from "react";
import {
  Button,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { onAuthStateChanged } from "firebase/auth";
import { app } from "../Config";

export default function Login(props) {

  return (
    <LinearGradient colors={["#441B55", "#b61fb5"]} style={styles.background}>
      <SafeAreaView style={styles.container}>
        <Text>Home Page</Text>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
