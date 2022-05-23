import React, { Component } from "react";
import { Button, View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Login(props) {
  return( 
    <SafeAreaView>
        <Text>Hello, this is login page</Text>
        <Button
              title="Navigate"
              onPress={() => props.navigation.navigate('Register')}
              color="#5219ac"
            />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: "80%",
    marginTop: 25,
    padding: 12,
    fontSize: 18,
    borderWidth: 0.2,
    borderRadius: 10,
    borderColor: "gray",
  },
});
