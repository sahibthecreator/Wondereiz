import React, { Component } from "react";
import { Button, View, Text, StyleSheet } from "react-native";
import { app } from "../Config";

export default function Register(props) {
  return( 
    <View>
        <Text>Register page</Text>
        <Button
              title="Navigate"
              onPress={() => props.navigation.navigate('Login')}
              color="#5219ac"
            />
            <Text
      onPress={() => props.navigation.navigate("TransitionPage1")}
>
TransitionPage1{" "}
</Text>
<Text
      onPress={() => props.navigation.navigate("TransitionPage2")}
>
TransitionPage2{" "}
</Text>
<Text
      onPress={() => props.navigation.navigate("TripDetails")}
>
Trip details{" "}
</Text>
<Text
      onPress={() => props.navigation.navigate("Filters")}
>
Filters{" "}
</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
  }
});