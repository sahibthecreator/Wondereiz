import { useRef, useState } from "react";
import {
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  View,
  SafeAreaView,
  TextInput,
  ScrollView,
  Alert
} from "react-native";
import Slider from "@react-native-community/slider";
import DateTimePicker from "@react-native-community/datetimepicker";
//import { TimePicker } from "react-native-simple-time-picker";
import { Dropdown } from "react-native-material-dropdown-v2-fixed";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db, app } from "../Config";

export default function CreateTrip(props) {
  const [selectedCityFrom, setSelectedCityFrom] = useState();
  const [selectedCityTo, setSelectedCityTo] = useState();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [selectedPeopleNum, setselectedPeopleNum] = useState();
  const [minAge, setMinAge] = useState("15");
  const [maxAge, setMaxAge] = useState("60");
  const [description, setDescription] = useState("");

  let dateValue = new Date();

  //--------------------City Picker-----------------------------//

  const data_city = [
    { value: "Amsterdam" },
    { value: "Eindhoven" },
    { value: "Rotterdam" },
    { value: "The Hague" },
    { value: "Utrecht" },
    { value: "Tilburg" },
    { value: "Groningen" },
    { value: "Emmen" },
    { value: "Zwolle" },
  ];

  const dataPeople = [
    { value: "1" },
    { value: "2" },
    { value: "3" },
    { value: "4" },
    { value: "5" },
    { value: "6" },
    { value: "7" },
  ];

  const config = {
    fontSize: 15,
    fontWeight: "500",
    backgroundColor: "lightgray",
    textColor: "black",
    selectedBackgroundColor: "lightgray",
    selectedTextColor: "purple",
    selectedFontWeight: "bold",
  };

  //Inserting into Db//

  function CreateRoom() {
    var id = "";
    var possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 7; i++)
      id += possible.charAt(Math.floor(Math.random() * possible.length));
    const roomRef = doc(db, "Room", id);
    setDoc(roomRef, {
      id: id,
      adminUserUid: app.auth().currentUser.uid,
      membersUserUid: [],
      mainPicture:
        "http://t3.gstatic.com/licensed-image?q=tbn:ANd9GcSFmmKZAP570tzz3jLwPXqQ8CiiIEHp_icEOkZtKfXFs_h_PFuVtZePRHSfw_zUyQp3",
      description: description,
      cityFrom: selectedCityFrom,
      cityTo: selectedCityTo,
      travelDate: `${selectedDate.getUTCDate}/${selectedDate.getUTCMonth}/${selectedDate.getUTCFullYear}`,
      travelTime: `${time.getUTCHours}:${time.getUTCMinutes}`,
      minAge: minAge,
      maxAge: maxAge,
      MaxNumberPeople: selectedPeopleNum,
    }).then(() => {
      Alert.alert(
        "Room was created successfully",
        "Good luck!",
        [
          {
            text: "Thank you",
            onPress: () => {
              props.navigation.goBack();
            },
          },
        ],
        { cancelable: false }
      );
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ width: "100%", paddingHorizontal:"10%" }}>
        <Text style={styles.heading}>Create a trip</Text>
        {/* ---------------City Picker------------------ */}

        <Dropdown
          icon="chevron-down"
          onChangeText={(value) => setSelectedCityFrom(value)}
          iconColor="#E1E1E1"
          label="Select City from:"
          data={data_city}
          useNativeDriver={true}
          dropdownPosition={-5}
        />

        <Dropdown
          icon="chevron-down"
          onChangeText={(value) => setSelectedCityTo(value)}
          iconColor="#E1E1E1"
          label="Select City to:"
          data={data_city}
          useNativeDriver={true}
          dropdownPosition={-5}
        />

        {/* --------------Date picker------------------ */}
        <Text style={{ fontSize: 16, color: "gray" }}>Trip date:</Text>
        <View
          style={{ width: "100%", flexDirection: "row", marginVertical: 15 }}
        >
          <DateTimePicker
            style={{ marginBottom: 10, alignSelf: "flex-start", width: 150 }}
            value={selectedDate}
            onChange={(event, date) => setSelectedDate(date)}
          />

          {/* --------------Time picker------------------ */}

          <DateTimePicker
            style={{ marginBottom: 10, alignSelf: "flex-end", width: 150 }}
            value={time}
            onChange={(event, time) => console.log(time)}
            mode={"time"}
            timeZoneOffsetInMinutes={-0}
          />
        </View>

        {/* ---------------People For the trip------------------ */}

        <Dropdown
          icon="chevron-down"
          onChangeText={(value) => setselectedPeopleNum(value)}
          iconColor="#E1E1E1"
          label="Number of people:"
          data={dataPeople}
          useNativeDriver={true}
          dropdownPosition={-5}
        />

        {/* ---------------Slider------------------ */}

        <Text style={{ fontSize: 16, marginVertical: 20, color: "#606060" }}>
          Minimum age: {minAge}
        </Text>

        <Slider
          style={{ width: 300, height: 29, alignSelf: "center" }}
          minimumValue={15}
          maximumValue={maxAge}
          minimumTrackTintColor="#bd2aba"
          maximumTrackTintColor="lightgray"
          thumbTintColor="#bd2aba"
          value={1}
          onValueChange={(value) => setMinAge(parseInt(value))}
        />

        <Text style={{ fontSize: 16, marginVertical: 20, color: "#606060" }}>
          Maximum age: {maxAge}
        </Text>

        <Slider
          style={{ width: 300, height: 29, alignSelf: "center" }}
          minimumValue={minAge}
          maximumValue={60}
          minimumTrackTintColor="#bd2aba"
          maximumTrackTintColor="lightgray"
          thumbTintColor="#bd2aba"
          value={1}
          onValueChange={(value) => setMaxAge(parseInt(value))}
        />

        {/*Text input */}
        <Text
          style={{
            fontSize: 17,
            marginBottom: 10,
            marginTop: 13,
            color: "#606060",
          }}
        >
          More about the trip
        </Text>
        <TextInput
          style={{
            width: 300,
            height: 120,
            borderRadius: 20,
            backgroundColor: "#d9d9da",
            paddingBottom: 80,
            paddingTop: 10,
            paddingHorizontal: 10,
            alignSelf: "center",
            fontSize: 16,
          }}
          multiline
          maxLength={60}
          placeholder=" Enter text..."
          onChangeText={(text) => setDescription(text)}
        />

        <TouchableOpacity style={styles.button} onPress={() => CreateRoom()}>
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    flex: 1,
    fontSize: 25,
    color: "#8736AA",
    marginTop: 50,
    marginBottom: 30,
    alignSelf: "center",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 18,
    width: "90%",
    backgroundColor: "#bd2aba",
    height: 35,
    marginTop: 20,
    marginBottom: 50,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
  selectLabel: {
    color: "#606060",
    marginBottom: 5,
    fontSize: 17,
  },
  selectPeople: {
    color: "#606060",
  },
});
