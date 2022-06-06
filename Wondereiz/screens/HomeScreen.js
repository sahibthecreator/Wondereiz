import React from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import { ScrollView } from "react-native";
import Post from "../components/Post";
import Header from "../components/Header";
import { TRIPSINFO } from "../data/TripsInfo";
import BottomTabs from "../components/BottomTabs";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Home(props) {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView>
        {TRIPSINFO.map((post, index) => (
          <Post post={post} key={index} />
        ))}
      </ScrollView>
      <TouchableOpacity>
        <Text>Hello</Text>
      </TouchableOpacity>
      <BottomTabs navigation={props.navigation} ></BottomTabs>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
});
