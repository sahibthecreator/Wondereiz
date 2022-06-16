import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ImageOpenModal = (modalVisible) => {
  return (
    <View style={styles.imageModal}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <SafeAreaView style={{width: '100%', height:"100%", backgroundColor: 'black'}}>
          <View style={styles.header}></View>

          <View style={styles.main}></View>

          <View style={styles.footer}></View>
        </SafeAreaView>
      </Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  
});

export default ImageOpenModal;
