import React, { Component } from "react";
import { Button, View, Text, StyleSheet, SafeAreaView } from "react-native";
import { app } from "../Config";

export default function Register(props) {
  return (
    <SafeAreaView style={{ alignItems: 'center' }}>
      <Text>Register page</Text>
      <Button
        title="Navigate"
        onPress={() => props.navigation.navigate("Login")}
        color="#5219ac"
      />
      <Text onPress={() => props.navigation.navigate("TransitionPage1")}>
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
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
  },
});
