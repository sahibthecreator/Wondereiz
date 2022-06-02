import React from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";

export default function GroupInfoScreen(props) {
  return (
    <SafeAreaView style={styles.container}>
        <Text>Infoooo</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
});
