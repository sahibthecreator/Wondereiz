import { useState } from "react";
import { Text, StyleSheet, Image, TouchableOpacity, View, SafeAreaView, TextInput, ScrollView } from "react-native";
import {Slider} from "@react-native-community/slider";
import {Select} from "../components/react-native-select";
//import {DatePicker} from "react-native-neat-date-picker";
// {TimePicker} from 'react-native-simple-time-picker';






export default function CreateTrip(props) {

    const [minAge, setMinAge] = useState("15");
    const [maxAge, setMaxAge] = useState("15");
    const [selectedCityFrom, setSelectedCityFrom] = useState();
    const [selectedCityTo, setSelectedCityTo] = useState();
    const [selectedPeopleNum, setselectedPeopleNum] = useState("0");
    const [selectedDate, setSelectedDate] = useState(null);
    const [time, setTime] = useState('');
    const [message, setMessage] = useState('');
    const [preference, setPreference] = useState("");
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [value, setValue] = useState({
        hours: 10,
        minutes: 10,
        seconds: 0,
    });

    const handleChange = (newValue) => {
        setValue(newValue);
    };



    // Const's for Date of birth//

    const openDatePicker = () => {
        setShowDatePicker(true);
    };

    const onCancel = () => {
        // You should close the modal in here
        setShowDatePicker(false);
    };

    const onConfirm = (date) => {
        setShowDatePicker(false);
        setSelectedDate(date);
    };



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
    const data_people = [
        { text: "2", value: 2 },
        { text: "3", value: 3 },
        { text: "4", value: 4 },
        { text: "5", value: 5 },
        { text: "6", value: 6 },
        { text: "7", value: 7 },
    ];

    //Inserting into Db//

    function CreateRoom() {
        var id = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 5; i++)
            id += possible.charAt(Math.floor(Math.random() * possible.length));
        const roomRef = collection(db, "Room");
        addDoc(roomRef, {
            id: id,
            adminUserUid: app.auth().currentUser.uid,
            membersUserUid: [],
            //mainPicture: "http://t3.gstatic.com/licensed-image?q=tbn:ANd9GcSFmmKZAP570tzz3jLwPXqQ8CiiIEHp_icEOkZtKfXFs_h_PFuVtZePRHSfw_zUyQp3",
            description: message,
            cityFrom: selectedCityFrom,
            cityTo: selectedCityTo,
            travelDate: selectedDate,
            travelTime: value,
            minAge: minAge,
            maxAge: maxAge,
            MaxNumberPeople: selectedPeopleNum
        })
    }




    return (
        <SafeAreaView>
            <ScrollView style={{flex:1}}>
                <Text style={styles.heading}>Create a trip</Text>
                {/* ---------------City Picker------------------ */}


                <View style={{ zIndex: 200, width: 300, marginBottom: 8, alignSelf: 'center' }}>
                    <Text style={styles.selectLabel}>From:</Text>
                    <Select
                        data={data_city}
                        onSelect={(value) => setSelectedCityFrom(value)}
                        value={selectedCityFrom}
                        config={config}
                        placeholder={"City"}
                    />
                </View>

                <View style={{ zIndex: 200, width: 300, marginBottom: 18, alignSelf: 'center' }}>
                    <Text style={styles.selectLabel}>To:</Text>
                    <Select
                        data={data_city}
                        onSelect={(value) => setSelectedCityFrom(value)}
                        value={selectedCityFrom}
                        config={config}
                        placeholder={"City"}
                    />
                </View>

                {/* --------------Date picker------------------ 
                <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center', marginBottom: 15 }}>

                    <TouchableOpacity onPress={openDatePicker} style={{ flex: 1, width: "90%", height: 32, backgroundColor: '#d9d9da', borderRadius: 15, }} >
                        <Text style={{ flex: 1, paddingLeft: 10, paddingTop: 5, color: '#606060' }}>dd/mm/yyyy</Text>
                    </TouchableOpacity>
                    <DatePicker
                        isVisible={showDatePicker}
                        mode={"single"}
                        onCancel={onCancel}
                        onConfirm={(date) => onConfirm(date)}
                    />
                </View>
                */}


                <View>
                    {/* --------------Time picker------------------ 
                    <Text style={{ fontSize: 17, color: '#606060', paddingBottom: 5 }}>
                        Your time: {value.hours}:{value.minutes}
                    </Text>
                    <TimePicker defaultValue={value} value={value} onChange={handleChange} style={{ backgroundColor: 'red' }} />
                    */}
                    </View>
                



                {/* ---------------People For the trip------------------ */}
                <View style={{ zIndex: 100, width: 300, alignSelf: 'center' }}>
                    <Text style={styles.selectLabel}>Number of people: {selectedPeopleNum}</Text>
                    <Select
                        data={data_people}
                        onSelect={(value) => setselectedPeopleNum(value)}
                        value={selectedPeopleNum}
                        config={config}
                        placeholder={"Select people"}
                    />
                </View>



                {/* ---------------Slider------------------ */}

                <Text style={{ fontSize: 16, marginTop: 20, color: '#606060' }}>Minimum age: {minAge}</Text>
                <Text style={{ fontSize: 12, marginLeft: 240 }}>15 - 60+</Text>

                <Slider
                    style={{ width: 300, height: 29, alignSelf: 'center' }}
                    minimumValue={15}
                    maximumValue={60}
                    minimumTrackTintColor="#bd2aba"
                    maximumTrackTintColor="#bd2aba"
                    thumbTintColor="#bd2aba"
                    value={1}
                    onValueChange={(value) => setMinAge(parseInt(value))}
                />


                <Text style={{ fontSize: 16, marginTop: 20, color: '#606060' }}>Maximum age: {maxAge}</Text>
                <Text style={{ fontSize: 12, marginLeft: 240 }}>15 - 60+</Text>

                <Slider
                    style={{ width: 300, height: 29, alignSelf: 'center' }}
                    minimumValue={15}
                    maximumValue={60}
                    minimumTrackTintColor="#bd2aba"
                    maximumTrackTintColor="#bd2aba"
                    thumbTintColor="#bd2aba"
                    value={1}
                    onValueChange={(value) => setMaxAge(parseInt(value))}
                />



                {/*Text input */}
                <Text style={{ fontSize: 17, marginBottom: 10, marginTop: 13, color: '#606060' }}>More about the trip</Text>
                <TextInput style={{ width: 300, height: 120, borderRadius: 20, backgroundColor: '#d9d9da', paddingBottom: 80, alignSelf: 'center' }} placeholder=" Enter text..."></TextInput>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => CreateRoom()}>
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
        alignSelf: 'center',
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
        color: '#606060',
        marginBottom: 5,
        fontSize: 17,
    },
    selectPeople: {
        color: '#606060',
    },
});
