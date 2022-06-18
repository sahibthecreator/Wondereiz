import React, { Component, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { app } from "../Config";

import Slider from "@react-native-community/slider";

import Select from "../components/react-native-select";

export default function Filters(props) {
  const [minAge, setMinAge] = useState("15");

  const [maxAge, setMaxAge] = useState(minAge);

  const city = [
    { text: "Amsterdam", value: "Amsterdam" },
    { text: "Emmen", value: "Emmen" },
    { text: "Groningen", value: "Groningen" },
    { text: "Eindhoven", value: "Eindhoven" },
    { text: "Mepel", value: "Mepel" },
  ];

  const [selectedCity, setSelectedCity] = useState();

  const day = [
    { text: "01", value: 1 },
    { text: "02", value: 2 },
    { text: "03", value: 3 },
    { text: "04", value: 4 },
    { text: "05", value: 5 },
    { text: "06", value: 6 },
    { text: "07", value: 7 },
    { text: "08", value: 8 },
    { text: "09", value: 9 },
    { text: "10", value: 10 },
    { text: "11", value: 11 },
    { text: "12", value: 12 },
    { text: "13", value: 13 },
    { text: "14", value: 14 },
    { text: "15", value: 15 },
    { text: "16", value: 16 },
    { text: "17", value: 17 },
    { text: "18", value: 18 },
    { text: "19", value: 19 },
    { text: "20", value: 20 },
    { text: "21", value: 21 },
    { text: "22", value: 22 },
    { text: "23", value: 23 },
    { text: "24", value: 24 },
    { text: "25", value: 25 },
    { text: "26", value: 26 },
    { text: "27", value: 27 },
    { text: "28", value: 28 },
    { text: "29", value: 29 },
    { text: "30", value: 30 },
    { text: "31", value: 31 },
  ];

  const [selectedDay, setSelectedDay] = useState();

  const month = [
    { text: "01", value: 1 },
    { text: "02", value: 2 },
    { text: "03", value: 3 },
    { text: "04", value: 4 },
    { text: "05", value: 5 },
    { text: "06", value: 6 },
    { text: "07", value: 7 },
    { text: "08", value: 8 },
    { text: "09", value: 9 },
    { text: "10", value: 10 },
    { text: "11", value: 11 },
    { text: "12", value: 12 },
  ];

  const [selectedMonth, setSelectedMonth] = useState();

  const year = [
    { text: "2022", value: 2022 },
    { text: "2023", value: 2023 },
  ];

  const [selectedYear, setSelectedYear] = useState();

  const time = [
    { text: "00:00", value: "00:00" },
    { text: "00:30", value: "00:30" },
    { text: "01:00", value: "01:00" },
    { text: "01:30", value: "01:30" },
    { text: "02:00", value: "02:00" },
    { text: "02:30", value: "02:30" },
    { text: "03:00", value: "03:00" },
    { text: "03:30", value: "03:30" },
    { text: "04:00", value: "04:00" },
    { text: "04:30", value: "04:30" },
    { text: "05:00", value: "05:00" },
    { text: "05:30", value: "05:30" },
    { text: "06:00", value: "06:00" },
    { text: "06:30", value: "06:30" },
    { text: "07:00", value: "07:00" },
    { text: "07:30", value: "07:30" },
    { text: "08:00", value: "08:00" },
    { text: "08:30", value: "08:30" },
    { text: "09:00", value: "09:00" },
    { text: "09:30", value: "09:30" },
    { text: "10:00", value: "10:00" },
    { text: "10:30", value: "10:30" },
    { text: "11:00", value: "11:00" },
    { text: "11:30", value: "11:30" },
    { text: "12:00", value: "12:00" },
    { text: "12:30", value: "12:30" },
    { text: "13:00", value: "13:00" },
    { text: "13:30", value: "13:30" },
    { text: "14:00", value: "14:00" },
    { text: "14:30", value: "14:30" },
    { text: "15:00", value: "15:00" },
    { text: "15:30", value: "15:30" },
    { text: "16:00", value: "16:00" },
    { text: "16:30", value: "16:30" },
    { text: "17:00", value: "17:00" },
    { text: "17:30", value: "17:30" },
    { text: "18:00", value: "18:00" },
    { text: "18:30", value: "18:30" },
    { text: "19:00", value: "19:00" },
    { text: "19:30", value: "19:30" },
    { text: "20:00", value: "20:00" },
    { text: "20:30", value: "20:30" },
    { text: "21:00", value: "21:00" },
    { text: "21:30", value: "21:30" },
    { text: "22:00", value: "22:00" },
    { text: "22:30", value: "22:30" },
    { text: "23:00", value: "23:00" },
    { text: "23:30", value: "23:30" },
  ];

  const [selectedTime, setSelectedTime] = useState();

  const people = [
    { text: "2", value: 2 },
    { text: "3", value: 3 },
    { text: "4", value: 4 },
    { text: "5", value: 5 },
    { text: "6", value: 6 },
    { text: "7", value: 7 },
  ];

  const [selectedPeople, setSelectedPeople] = useState();

  const config = {
    fontSize: 18,
    fontWeight: "bold",
    backgroundColor: "#DADADA",
    textColor: "#606060",
    selectedBackgroundColor: "lightgray",
    selectedTextColor: "#D50FBC",
    selectedFontWeight: "bold",
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.exit}
        onPress={() => props.navigation.navigate("SearchPage")}
      >
        <Image source={require("../assets/arrow.png")} />
      </TouchableOpacity>
      <Text style={styles.header}>Filters</Text>

      <View
        style={{
          zIndex: 100,
          width: "97%",
          position: "absolute",
          top: 125,
          left: 20,
        }}
      >
        <Text style={styles.selectLabel}>Select your city:</Text>
        <Select
          data={city}
          onSelect={(value) => setSelectedCity(value)}
          value={selectedCity}
          config={config}
          placeholder={""}
        />
      </View>

      <View
        style={{
          zIndex: 90,
          width: "30%",
          position: "absolute",
          top: 250,
          left: 20,
        }}
      >
        <Text style={styles.selectLabel}>Date:</Text>
        <Select
          data={day}
          onSelect={(value) => setSelectedDay(value)}
          value={selectedDay}
          config={config}
          placeholder={"Day"}
        />
      </View>

      <View
        style={{
          zIndex: 90,
          width: "30%",
          position: "absolute",
          top: 280,
          left: 145,
        }}
      >
        <Select
          data={month}
          onSelect={(value) => setSelectedMonth(value)}
          value={selectedMonth}
          config={config}
          placeholder={"Month"}
        />
      </View>
      <View
        style={{
          zIndex: 90,
          width: "30%",
          position: "absolute",
          top: 280,
          right: 20,
        }}
      >
        <Select
          data={year}
          onSelect={(value) => setSelectedYear(value)}
          value={selectedYear}
          config={config}
          placeholder={"Year"}
        />
      </View>

      <View
        style={{
          zIndex: 80,
          width: "30%",
          position: "absolute",
          top: 375,
          left: 20,
        }}
      >
        <Text style={styles.selectLabel}>Time:</Text>
        <Select
          data={time}
          onSelect={(value) => setSelectedTime(value)}
          value={selectedTime}
          config={config}
          placeholder={""}
        />
      </View>

      <View
        style={{
          zIndex: 70,
          width: "50%",
          position: "absolute",
          top: 500,
          left: 20,
        }}
      >
        <Text style={styles.selectLabel}>Number of people:</Text>
        <Select
          data={people}
          onSelect={(value) => setSelectedPeople(value)}
          value={selectedPeople}
          config={config}
          placeholder={""}
          width="55%"
        />
      </View>

      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
          position: "absolute",
          bottom: 250,
          left: 25,
          color: "#606060",
        }}
      >
        Minimum age: {minAge}
      </Text>

      <Slider
        style={{
          width: 300,
          height: 40,
          position: "absolute",
          bottom: 200,
          left: 50,
        }}
        minimumValue={15}
        maximumValue={100}
        minimumTrackTintColor="#D50FBC"
        maximumTrackTintColor="#606060"
        thumbTintColor="#FFFFFF"
        value={1}
        onValueChange={(value) => setMinAge(parseInt(value))}
      />

      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
          position: "absolute",
          bottom: 175,
          left: 25,
          color: "#606060",
        }}
      >
        Maximum age: {maxAge}
      </Text>

      <Slider
        style={{
          width: 300,
          height: 40,
          position: "absolute",
          bottom: 125,
          left: 50,
        }}
        minimumValue={minAge}
        maximumValue={100}
        minimumTrackTintColor="#D50FBC"
        maximumTrackTintColor="#606060"
        thumbTintColor="#FFFFFF"
        value={1}
        onValueChange={(value) => setMaxAge(parseInt(value))}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          props.navigation.navigate("SearchPage", {
            city: selectedCity,
            day: selectedDay,
            month: selectedMonth,
            year: selectedYear,
            time: selectedTime,
            people: selectedPeople,
            minAge: minAge,
            maxAge: maxAge,
          })
        }
      >
        <Text style={styles.button_text}>Confirm</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "FFFFFF",
  },
  exit: {
    position: "absolute",
    top: 50,
    left: 20,
  },
  header: {
    position: "absolute",
    top: 55,
    left: 175,
    color: "#8736AA",
    fontSize: 20,
    fontWeight: "bold",
  },
  dropdown: {
    margin: 16,
    height: 50,
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  selectLabel: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 5,
    marginBottom: 10,
    color: "#606060",
  },
  button: {
    backgroundColor: "#D50FBC",
    position: "absolute",
    bottom: 40,
    marginBottom: 5,
    padding: 10,
    paddingHorizontal: 100,
    borderRadius: 25,
  },
  button_text: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#FFFFFF",
  },
});