import React from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import BottomTabs from "../components/BottomTabs";

export default function GroupInfoScreen(props) {
  return (
    <SafeAreaView style={styles.container}>
        <Text>Infoooo</Text>
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
