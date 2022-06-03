import React from "react";
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";

export default function GroupInfoScreen(props) {
  return (
    <SafeAreaView style={styles.container}>
        <View>
          <TouchableOpacity>
            <Image
              source={{
                uri: "https://img.icons8.com/ios-glyphs/30/D50FBC/back.png",
              }}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
        <View>
            <Image
              source={{
                uri: "https://media.cntraveller.com/photos/611be7c7a106ea5ed3099f8c/4:3/w_2664,h_1998,c_limit/amsterdam-mag-jan19-matthew-buck23.jpg",
              }}
              style={styles.groupImg}
            />
            <Text style={{
            color: "#8736AA",
            fontSize: 18,
            fontWeight: '500',
            marginLeft: 100,
            marginTop: 30
            }}>
              Eindhoven - Amsterdam
            </Text>
            <Text style={{
              color: "#BFBFBF",
              fontSize: 13,
              fontWeight: '500',
              marginLeft: 155,
              marginTop: 8
            }}>
              15 June 2022
            </Text>
        </View>

        <View style={styles.divider}/>

        <ScrollView>
          <Text style={{
            color: "#8736AA",
            fontSize: 18,
            fontWeight: '500',
            marginLeft: 30,
            marginTop: 35
            }}>
              6 Partecipants
          </Text> 
          
          <View style={styles.partecipants}>
            
          </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  icon: {
    height: 30,
    width: 30,
    marginTop: 20,
    marginLeft: 15
  },
  groupImg: {
    marginLeft: 140,
    marginTop: 20,
    width: 130,
    height: 130,
    borderRadius: 70
  },
  divider: {
    marginTop: 45,
    borderBottomColor:"white",
    borderBottomWidth:1,
    shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.40,
      shadowRadius: 3.84,
      elevation: 5,
  },
  partecipants: {
      top: 0,
      margin: 30,
      paddingTop: 335,
      paddingBottom: 15,
      borderRadius: 30,
      backgroundColor: "white",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
  }
});
