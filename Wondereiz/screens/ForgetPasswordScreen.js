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
import { app } from "../Config";

export default function ForgetPassword(props) {
  var [email, setEmail] = useState("");

  const forgotPassword = () => {
    app
      .auth()
      .sendPasswordResetEmail(email)
      .then(function (user) {
        alert("Please check your email...");
      })
      .catch(function (e) {
        console.log(e);
      });
  };

  return (
    <LinearGradient colors={["#441B55", "#b61fb5"]} style={styles.background}>
      <SafeAreaView style={styles.container}>
        <TouchableOpacity onPress={() => props.navigation.navigate("Login")} style={styles.backBtn}>
          <Image
            source={{
              uri: "https://img.icons8.com/ios-filled/100/FFFFFF/left.png",
            }}
            style={{flex:1}}
          />
        </TouchableOpacity>
        <View style={styles.form}>
          <Image
            style={styles.illustration}
            source={require("../assets/sad.png")}
          />
          <Text style={styles.caption}>Trouble Logging In?</Text>
          <Text style={styles.smallText}>
            Enter your email and we'll send you a link to get back into your
            account.
          </Text>
          <View style={styles.sectionStyle}>
            <Image
              source={{
                uri: "https://img.icons8.com/ios-glyphs/90/000000/new-post.png",
              }}
              style={styles.imageStyle}
            />
            <TextInput
              placeholder="Your e-mail"
              onChangeText={(email) => setEmail(email)}
              value={email}
              style={styles.input}
            />
          </View>

          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => {
              forgotPassword();
            }}
            underlayColor="#fff"
          >
            <Text style={styles.loginText}>Reset</Text>
          </TouchableOpacity>
        </View>
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
    marginTop: 10,
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
    marginBottom: 25,
  },
  loginText: {
    color: "white",
    fontSize: 15,
  },

  sectionStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#dadada",
    height: 40,
    width: "80%",
    borderRadius: 10,
    margin: 15,
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
  illustration: {
    width: 100,
    height: 150,
    marginTop: 15,
  },
  smallText: {
    marginHorizontal: "15%",
    marginVertical: 5,
    fontFamily: "Futura",
  },
});
