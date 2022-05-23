import React, { Component } from "react";
import { Button, View, Text, StyleSheet } from "react-native";

export default function Register(props) {
  return( 
    <View>
        <Text>Register page</Text>
        <Button
              title="Navigate"
              onPress={() => props.navigation.navigate('Login')}
              color="#5219ac"
            />
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