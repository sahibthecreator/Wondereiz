import React, { Component } from "react";
import { Button, View, Text, StyleSheet, SafeAreaView} from "react-native";
import { app, db } from "../Config";
import { useState } from "react";
import {Image, TouchableOpacity} from "react-native";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { TextInput } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { doc, setDoc } from "firebase/firestore";
import Select from "../components/react-native-select";
import DateTimePicker from "@react-native-community/datetimepicker"

//import {DatePicker} from "react-native-neat-date-picker";



 export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [error, setError] = useState("");
  const [gender, setGender] = useState("");
  const [selectedCity, setSelectedCity] = useState();
  const [preference, setPreference] = useState("");
  //Making the constants
  
  //--------------------City Picker-----------------------------//

  const data_city = [
    { text: "Amsterdam", value: 1 },
    { text: "Eindhoven", value: 2 },
    { text: "Rotterdam", value: 4 },
    { text: "The Hague", value: 5 },
    { text: "Utrecht", value: 6 },
    { text: "Tilburg", value: 7 },
    { text: "Groningen", value: 8 },
    { text: "Emmen", value: 9 },
    { text: "Zwolle", value: 10 },
];

  const config = {
    fontSize: 15,
    fontWeight: '500',
    backgroundColor: "lightgray",
    textColor: "black",
    selectedBackgroundColor: "lightgray",
    selectedTextColor: "purple",
    selectedFontWeight: "bold",
};


const [date, setDate] = useState(new Date(1598051730000));
const [mode, setMode] = useState("date");
const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };



  //Checking if is empty and validating pasword
  const validatePassword = () => {
    if (password !== "" && confirmPassword !== "") {
      if (password !== confirmPassword) {
        setError("Password dont match");
        return false;
      }
      return true;
    }
  };

  function Register() {
    //e.preventDefault();
    setError("");
    if (validatePassword()) {
      // Create a new user with email and password using firebase
      createUserWithEmailAndPassword(app.auth(), email, password)
        .then(() => {
          sendEmailVerification(app.auth().currentUser)
            .then(() => {
              alert("Email sent");
              // Add a new document in collection "cities"
              setDoc(doc(db, "User", app.auth().currentUser.uid), {
                // username: username,
                // email: email,
                // password: password,

                firstName: firstName,
                lastName: lastName,
                email: email,
                username: username,
                dateOfBirth: date,
                gender: preference,
                city:selectedCity

              });
            })
            .catch((err) => alert(err.message));
        })
        .catch((err) => setError(err.message));
    }
    setFirstName("");
    setLastName("");
    setUsername("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setEmail("");
    setUsername("");

  }



  return (
    <SafeAreaView style={{ alignItems: 'center' }}>
      {/*
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
          */}
      
      
      <LinearGradient colors={["white", "white"]} style={styles.background}>
      <View style={styles.container}>
        <View>
          <Text style={styles.heading}>Sign up</Text>
          {error !== "" ? <Text>{error}</Text> : null}
          <View>

          <Text style={styles.labels}>First name</Text>
          <TextInput
              style={styles.input}
              value={firstName}
              placeholder="First name"
              onChangeText={(firstName) => setFirstName(firstName)}
              placeholderTextColor="grey"
            />
             
            <Text style={styles.labels}>Last name</Text>
            <TextInput
              style={styles.input}
              value={lastName}
              placeholder="Last name"
              onChangeText={(lastName) => setLastName(lastName)}
              placeholderTextColor="grey"
            />
            
            <Text style={styles.labels}>Username</Text>
            <TextInput
              style={styles.input}
              value={username}
              placeholder="Choose a username"
              onChangeText={(username) => setUsername(username)}
              placeholderTextColor="grey"
            />
            <Text style={styles.labels}>E-mail address</Text>
            <TextInput
              style={styles.input}
              value={email}
              placeholder="Enter your email"
              onChangeText={(email) => setEmail(email)}
              placeholderTextColor="grey"
            />

            <Text style={styles.labels}>Password</Text>
            <TextInput
              style={styles.input}
              value={password}
              placeholder="Enter your password"
              onChangeText={(password) => setPassword(password)}
              placeholderTextColor="grey"
            />

          <Text style={styles.labels}>Confirm password</Text>
            <TextInput
              style={styles.input}
              value={confirmPassword}
              placeholder="Confirm password"
              onChangeText={(confirmPassword) =>
                setConfirmPassword(confirmPassword)
              }
              placeholderTextColor="grey"
            />
            

          </View>


          {/* Date picker*/}

          
          <TouchableOpacity 
            onPress={showDatepicker}
            style={styles.datePickerButton}
            >
              <Text style={styles.datePickerText}>Select your date of birth</Text>
            </TouchableOpacity>
            {show && (
          <DateTimePicker
            value={date}
            mode={mode}
            is24Hour={true}
            onChange={onChange}
          />
           )}
          {/*End  */}

          
          <View style={styles.section}>
          <TouchableOpacity
            style={preference === "male" ? styles.selected : styles.button}
            onPress={(preference) => setPreference("male")}
          >
            <Image style={styles.icon} source={require("../assets/male_icon.png")}/>
            <Text style={styles.btnText}>Male</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={preference === "female" ? styles.selected : styles.button}
            onPress={(preference) => setPreference("female")}
          >
            <Image style={styles.icon} source={require("../assets/female_icon.png")}/>
            <Text style={styles.btnText}>Female</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={preference === "Not specified" ? styles.selected : styles.button}
            onPress={(preference) => setPreference("Not specified")}
          >
            <Text style={styles.btnText}>Not specified</Text>
          </TouchableOpacity>
          </View>


          {/* ---------------City Picker------------------ */}


          <View style={{ zIndex: 200, width: 300, marginBottom: 8, alignSelf: 'center' }}>
            <Text style={styles.selectLabel}>Select your city:</Text>
            <Select
                data={data_city}
                onSelect={(value) => setSelectedCity(value)}
                value={selectedCity}
                config={config}
                placeholder={"City"}
                    />
            </View>

          <TouchableOpacity
            style={styles.RegButton}
            onPress={() => {
              Register();
            }}
          >
            <Text style={styles.buttonText}>Confirm</Text>
          </TouchableOpacity>

          <Text>Already have an account?</Text>
        </View>
      </View>
    </LinearGradient>



      {/* <Text onPress={() => props.navigation.navigate("TransitionPage1")}>
        TransitionPage1{" "}
      </Text>
      <Text onPress={() => props.navigation.navigate("TransitionPage2")}>
        TransitionPage2{" "}
      </Text>
      <Text onPress={() => props.navigation.navigate("TripDetails")}>
        Trip details{" "}
      </Text>
      <Text onPress={() => props.navigation.navigate("Filters")} style={{ fontSize: 40, fontWeight: '500' }}>Filters </Text>

      <Text onPress={() => props.navigation.navigate("GroupInfoScreen")} style={{ fontSize: 40, fontWeight: '500' }}>GroupInfoScreen </Text>

      <Text onPress={() => props.navigation.navigate("ProfilePicUpload")}>
        ProfilePicUpload{" "}
      </Text> */}
    </SafeAreaView>
  );
    }
    const styles = StyleSheet.create({
      container: {
        marginTop:140,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      },
      background: {
        width: "100%",
        height: "100%",
        position: "relative",
      },
      heading: {
        alignSelf:'center',
        fontSize:30,
        color: "#8736AA",
      },
      input: {
        alignSelf:'center',
        borderWidth: 1,
        marginBottom: 10,
        backgroundColor:'#dadada',
        borderColor: '#dadada',
        borderRadius: 30,
        padding: 5,
        height:40,
        width:300,
        paddingHorizontal:15,
      },
      logoTxt: {
        fontWeight: "600",
        fontSize: 20,
        color: "white",
      },
      registerBtn: {
        borderWidth: 1,
        borderColor: "white",
        borderRadius: 30,
        padding: 15,
      },

      section: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      },
      selected: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: 105,
        height: 30,
        margin: 5,
        borderRadius: 15,
        backgroundColor: "#bd2aba",
      },
      button: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: 100,
        height: 30,
        backgroundColor: "#d9d9da",
        margin: 5,
        borderRadius: 15,
      },
      icon: {
        width: 18,
        height: 18,
        marginRight: 10,
      },
      RegButton: {
        alignSelf:"center",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 18,
        width: 300,
        backgroundColor: "#bd2aba",
        height: 40,
        marginTop: 20,
        marginBottom: 50,
      },
      buttonText: {
        color: "white",
        fontSize: 20,
      },
      labels: {
        color: '#606060',
        marginBottom: 5,
        fontSize: 17,
        marginLeft: 40,
    
      },
      datePickerButton:{
        alignSelf:"center",
        justifyContent: "center",
        borderRadius: 18,
        width: 300,
        backgroundColor: "#dadada",
        height: 40,
        marginTop: 10,
        marginBottom: 10,
      },
      datePickerText:{
        color: 'grey',
        marginLeft: 15,
      },
    });
    
