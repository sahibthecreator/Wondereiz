import React from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import { ScrollView } from "react-native";
import Post from "../components/Post";
import Header from "../components/Header";
import { TRIPSINFO } from "../data/TripsInfo";
import BottomTabs from "../components/BottomTabs";

export default function Home(props) {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView>
        {TRIPSINFO.map((post, index) => (
          <Post post={post} key={index} />
        ))}
      </ScrollView>
      <BottomTabs></BottomTabs>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
});
