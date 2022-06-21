import React, { Component, useState } from "react";
import {
  Button,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { onAuthStateChanged } from "firebase/auth";
import { app } from "../Config";


export default function Login(props) {
  var [email, setEmail] = useState("");
  var [password, setPassword] = useState("");
  var [error, setError] = useState("");

  onAuthStateChanged(app.auth(), (user) => {
    if (user) {
      props.navigation.navigate("Home", { user });
    }
  });

  function SignIn() {
    app
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        props.navigation.navigate("Home", { user });
      })
      .catch((err) => {
        switch (err.code) {
          case "auth/invalid-email":
            setError("Invalid email");
            break;
          case "auth/wrong-password" || "auth/internal-error":
            setError("Invalid password");
            break;
          case "auth/user-not-found":
            setError("No such user registered");
            break;
        }
      });
  }

  return (
    <LinearGradient colors={["#441B55", "#b61fb5"]} style={styles.background}>
      <SafeAreaView style={styles.container}>
      <TouchableOpacity
          onPress={() => props.navigation.navigate("Welcome")}
          style={styles.backBtn}
        >
          <Image
            source={{
              uri: "https://img.icons8.com/ios-filled/100/FFFFFF/left.png",
            }}
            style={{ flex: 1 }}
          />
        </TouchableOpacity>
      
        <Text style={{fontSize: 20,fontWeight:"900", color: 'white', padding:30}}
        onPress={() => {
          setEmail('test@gmail.com');
          setPassword('qwerty');
          SignIn();
        }}
         >Fast Login</Text>
         <KeyboardAvoidingView
         behavior="padding">
        <View style={styles.form}>
          <Text style={styles.caption}>Sign In</Text>
          <View style={styles.sectionStyle}>
            <Image
              source={{
                uri: "https://img.icons8.com/material-rounded/90/000000/user.png",
              }}
              style={styles.imageStyle}
            />
            <TextInput
              placeholder="E-mail or Username"
              onChangeText={(email) => setEmail(email)}
              value={email}
              style={styles.input}
            />
          </View>

          <View style={styles.sectionStyle}>
            <Image
              source={{
                uri: "https://img.icons8.com/ios-glyphs/90/000000/lock--v1.png",
              }}
              style={styles.imageStyle}
            />
            <TextInput
              placeholder="Password"
              onChangeText={(password) => setPassword(password)}
              value={password}
              style={styles.input}
            />
          </View>
          <Text style={styles.errorMsg}>{error}</Text>
          <TouchableOpacity
            style={styles.loginBtn}
            //onPress={() => navigate("HomeScreen")}
            onPress={() => {
              SignIn();
            }}
            underlayColor="#fff"
          >
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
          <Text
            style={styles.forgetPassText}
            onPress={() => props.navigation.navigate("ForgetPassword")}
          >
            Forgot your password?{" "}
          </Text>
        </View>
        </KeyboardAvoidingView>
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
  backBtn: {
    width: 40,
    height: 40,
    position: "absolute",
    top: 40,
    left: 15,
  },
  form: {
    alignItems: "center",
    backgroundColor: "white",
    width: "80%",
    borderRadius: 20,
  },
  caption: {
    fontWeight: "bold",
    fontSize: 25,
    color: "#8736AA",
    marginTop: 30,
  },
  inputBox: {
    width: "80%",
    alignItems: "flex-start",
    marginTop: 15,
  },
  input: {
    flex: 1,
    backgroundColor: "#dadada",
    width: "100%",
    padding: 9,
    borderRadius: 10,
  },
  loginBtn: {
    backgroundColor: "#d50ebc",
    marginTop: 20,
    padding: 10,
    paddingHorizontal: 25,
    borderRadius: 17,
  },
  loginText: {
    color: "white",
    fontSize: 15,
  },
  forgetPassText: {
    color: "#8936aa",
    marginTop: 10,
    marginBottom: 15,
    textDecorationLine: "underline",
  },

  sectionStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#dadada",
    height: 40,
    width: "80%",
    borderRadius: 10,
    margin: 10,
  },
  imageStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: "stretch",
    alignItems: "center",
  },
  bgImage: {
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  errorMsg: {
    color: "red",
    fontWeight: "bold",
  },
});