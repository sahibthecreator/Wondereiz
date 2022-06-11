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
import { Dropdown } from "react-native-element-dropdown";

import Slider from "@react-native-community/slider";

import Select from "../components/react-native-select";

const data = [
  { label: "Item 1", value: "1" },
  { label: "Item 2", value: "2" },
  { label: "Item 3", value: "3" },
  { label: "Item 4", value: "4" },
  { label: "Item 5", value: "5" },
  { label: "Item 6", value: "6" },
  { label: "Item 7", value: "7" },
  { label: "Item 8", value: "8" },
];

export default function DropdownComponent(props) {
  const [value, setValue] = useState(null);

  const initialTripDate = [
    { id: "day", value: 1 },
    { id: "month", value: 1 },
    { id: "year", value: 2022 },
  ];

  const [tripDate, setTripDate] = useState(initialTripDate);

  const date = [
    { id: "day", label: "", min: 1, max: 31 },
    { id: "month", label: "", min: 1, max: 12 },
    { id: "year", label: "", min: 2022, max: new Date().getFullYear() },
  ];

  const initialTripTime = [
    { id: "hour", value: 0 },
    { id: "minute", value: 0 },
  ];

  const [tripTime, setTripTime] = useState(initialTripTime);

  const time = [
    { id: "hour", label: "", min: 0, max: 24 },
    { id: "minute", label: "", min: 0, max: 59 },
  ];

  const initialNumOfPeople = [{ id: "members", value: 1 }];

  const [numOfPeople, setNumOfPeople] = useState(initialNumOfPeople);

  const members = [{ id: "members", label: "", min: 0, max: 6 }];
  const [ageRange, setAgeRange] = useState([15, 60]);

  const ageRangeChange = (values) => setAgeRange(values);

  //---------------------Slider---------------------
  const [range, setRange] = useState("13");

  //--------------------City Picker-----------------------------

  const data = [
    { text: "Amsterdam", value: 1 },
    { text: "Emmen", value: 2 },
    { text: "Groningen", value: 3 },
    { text: "Eindhoven", value: 3 },
    { text: "Mepel", value: 3 },
    { text: "Mepel", value: 3 },
    { text: "Mepel", value: 3 },
    { text: "Mepel", value: 3 },
  ];

  const [selectedItem, setSelectedItem] = useState();

  const config = {
    fontSize: 18,
    fontWeight: '600',
    backgroundColor: "lightgray",
    textColor: "black",
    selectedBackgroundColor: "lightgray",
    selectedTextColor: "tomato",
    selectedFontWeight: "bold",
  };

  return (
    <SafeAreaView style={styles.container}>


      {/* ---------------City Picker------------------ */}


      <View style={{ zIndex: 100, width: "70%", marginLeft: 30, marginBottom: 40 }}>
        <Text style={styles.selectLabel}>Select your city:</Text>
        <Select
          data={data}
          onSelect={(value) => setSelectedItem(value)}
          value={selectedItem}
          config={config}
          placeholder={"Select City"}
        />
      </View>

      {/* ---------------Slider------------------ */}

      <Text style={{ fontSize: 20, fontWeight: "bold" }}>Age: {range}</Text>

      <Slider
        style={{ width: 250, height: 40 }}
        minimumValue={13}
        maximumValue={120}
        minimumTrackTintColor="tomato"
        maximumTrackTintColor="darkgray"
        thumbTintColor="#b61fb5"
        value={1}
        onValueChange={(value) => setRange(parseInt(value))}
      />

      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Select item"
        searchPlaceholder="Search..."
        value={value}
        onChange={(item) => {
          setValue(item.value);
        }}
      />
      <TouchableOpacity
        style={styles.exit}
        onPress={() => props.navigation.navigate("Search")}
      >
        <Image source={require("../assets/Arrow1.png")} />
      </TouchableOpacity>
      <Text styles={styles.header}>Filters</Text>
      <View style={styles.filters}>
        <Text style={styles.filters_text}>Select your city</Text>
        <View style={styles.filters_city}></View>
        <View style={styles.filters_date}>
          <Text style={styles.filters_text}>Date</Text>
        </View>
        <View style={styles.filters_time}>
          <Text style={styles.filters_text}>Time</Text>
        </View>
        <View style={styles.filters_members}>
          <Text style={styles.filters_text}>Number of people</Text>
        </View>
        <View style={styles.filters_age}>
          <Text style={styles.filters_text}>Age</Text>
          {/* <MultiSlider
            values={[ageRange[0], ageRange[1]]}
            sliderLength={280}
            onValuesChange={ageRangeChange}     NE RABOTAYET
            min={15}  
            max={60}
            allowOverlap={false}
            minMarkerOverlapDistance={10}
          /> */}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    marginTop: 10,
    color: "#8736AA",
    fontSize: 20,
    fontWeight: "semibold",
    fontFamily: "Sans-serif",
  },
  filters: {},
  filters_text: {},
  filters_city: {},
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
  selectLabel:{
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 5,
    marginBottom: 10
  }
});
