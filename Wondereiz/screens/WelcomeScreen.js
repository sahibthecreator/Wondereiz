import React from "react";
import {
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { onAuthStateChanged } from "firebase/auth";
import { app } from "../Config";

export default function Welcome(props) {
  // onAuthStateChanged(app.auth(), (user) => {
  //   if (user) {
  //     //alert("Signed In");
  //     //props.navigation.navigate("Home", { user });
  //   }
  // });

  return (
    <LinearGradient colors={["#441B55", "#b61fb5"]} style={styles.background}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.logoText}>Wondereiz</Text>
        <TouchableOpacity style={styles.signInBtn} onPress={() => props.navigation.navigate("Login")}>
          <Text style={styles.signInTxt}>Sign in with Email</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.registerBtn} onPress={() => props.navigation.navigate("Register")}>
          <Text style={styles.registerTxt}>Create an account</Text>
        </TouchableOpacity>

        <Image style={styles.bgImage} source={require("../assets/world.png")} />
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
  background: {
    width: "100%",
    height: "100%",
    position: "relative",
  },
  bgImage: {
    position: "absolute",
    bottom: -60,
    right: 0,
  },
  logoText: {
    fontWeight: "700",
    fontSize: 50,
    color: "white",
  },
  signInBtn: {
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 20,
    padding: 10,
    marginTop: 100,
  },
  signInTxt: {
    color: "white",
    fontSize: 17,
    marginHorizontal: 30,
    fontWeight: '500'
  },
  registerBtn: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    position: 'absolute',
    bottom: 0,
    marginBottom: 50,
    zIndex: 10
  },
  registerTxt: {
    color: "#b61fb5",
    fontSize: 17,
    fontWeight: '500',
    marginHorizontal: 100,
  },
});
