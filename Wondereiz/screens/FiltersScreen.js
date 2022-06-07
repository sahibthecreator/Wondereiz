import React, { Component, useState } from "react";
import { 
  StyleSheet,
  Text, 
  View, 
  Image,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { app } from "../Config";
import { Picker, onOpen } from 'react-native-actions-sheet-picker';
import NumberPlease from "react-native-number-please";
import MultiSlider from '@ptomasroos/react-native-multi-slider';

export default function Filters(props) {
  const TripDay = () => {
    const initialTripDate = [
      { id: "day", value: 1 },
      { id: "month", value: 1 },
      { id: "year", value: 2022 },
    ];

    const [tripDate, setTripDate] = useState(initialTripDate);

    const date = [
      { id: "day", label: "", min: 1, max: 31 },
      { id: "month", label: "", min: 1, max: 12 },
      { id: "year", label: "", min: 2022, max: new Date().getFullYear()
      },
    ];  
  };

  const TripHour = () => {
    const initialTripTime = [
      { id: "hour", value: 0 },
      { id: "minute", value: 0 },
    ];

    const [tripTime, setTripTime] = useState(initialTripTime);

    const time = [
      { id: "hour", label: "", min: 0, max: 24 },
      { id: "minute", label: "", min: 0, max: 59 },
    ];  
  };

  const NumberOfPeople = () => {
    const initialNumOfMembers = [
      { id: "members", value: 1 },
    ];

    const [numOfPeople, setNumOfPeople] = useState(initialNumOfPeople);

    const NumOfMembers = [
      { id: "members", label: "", min: 0, max: 6 },
    ];  
  };
  const Age = () => {
    const [ageRange, setAgeRange] = useState([15, 60])
  
    const ageRangeChange = (values) => setAgeRange(values)
  }
    


  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity 
      style={styles.exit}
      onPress={() => props.navigation.navigate("Search")}>
        <Image source={require('../assets/Arrow1.png')} />
      </TouchableOpacity>
      <Text styles={styles.header}>Filters</Text>
      <View style={styles.filters}>
        <Text style={styles.filters_text}>Select your city</Text>
          <View style={styles.filters_city}>
            <TouchableOpacity
            style={styles.button_city}
            onPress={() => {
            onOpen('city');
            }}
            > 
            <Image source={require('../assets/Arrow1.png')} />
            </TouchableOpacity>
            <Picker
              id="city"
              data={filteredData}
              inputValue={query}
              searchable={true}
              label="Select Your City"
              setSelected={setSelected}
              onSearch={onSearch}
            />
          </View>
        <View style={styles.filters_date}>
          <Text style={styles.filters_text}>Date</Text>
          <NumberPlease
          digits={date}
          values={tripDate}
          onChange={(values) => setTripDate(values)}
          />
        </View>
        <View style={styles.filters_time}>
          <Text style={styles.filters_text}>Time</Text>
          <NumberPlease
          digits={time}
          values={tripTime}
          onChange={(values) => setTripTime(values)}
          />
        </View>
        <View style={styles.filters_members}>
          <Text style={styles.filters_text}>Number of people</Text>
          <NumberPlease
          digits={members}
          values={numOfPeople}
          onChange={(values) => setNumOfPeople(values)}
          />
        </View>
        <View style={styles.filters_age}>
           <Text style={styles.filters_text}>Age</Text>
           <ViewContainer>
             <SliderWrapper>
               <LabelWrapper>
                 <LabelText>{ageRange[0]} </LabelText>
                 <LabelText>{ageRange[1]}</LabelText>
                </LabelWrapper>
                <MultiSlider
                values={[ageRange[0], ageRange[1]]}
                sliderLength={280}
                onValuesChange={ageRangeChange}
                min={15}
                max={60}
                allowOverlap={false}
                minMarkerOverlapDistance={10}
                />
             </SliderWrapper>
          </ViewContainer>
        </View>  
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    header: {
      marginTop: 10,
      color: '#8736AA',
      fontSize: 20,
      fontWeight: 'semibold',
      fontFamily: 'Sans-serif',
    },
    filters: {

    },
    filters_text: {

    },
    filters_city: {

    },
});
