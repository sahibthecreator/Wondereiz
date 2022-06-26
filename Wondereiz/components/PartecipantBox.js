import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'

/*const PartecipantBox = ({ post }) => {
  return (
    <View style={styles.partecipantBoxContainer}>
      <PartecipantBoxHeader post={post} />
      <TouchableOpacity onPress={() => props.navigation.navigate("Profile", { props })}>
        <Image
          source={{
            uri: "https://img.icons8.com/ios-glyphs/30/D50FBC/back.png",
          }}
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  )
}

const PartecipantBoxHeader = ({ post }) => (
  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Image source={{ uri: post.partecipant_picture }} style={styles.partecipantBox} />
      <Text
        style={{
          color: "#4B4B4B",
          fontWeight: "500",
          fontSize: 18,
          marginLeft: 35,
          marginTop: 10
        }}
      >
        {post.caption}
      </Text>
      <TouchableOpacity onPress={() => props.navigation.navigate("Profile", { props })}>
        <Image
          source={{
            uri: "https://img.icons8.com/ios-glyphs/30/D50FBC/back.png",
          }}
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  </View>
)

const styles = StyleSheet.create({
  partecipantBox: {
    width: 50,
    height: 50,
    marginLeft: 10,
    marginTop: 15,
    borderRadius: 40,
    flexDirection: "row"
  },
  icon: {
    height: 30,
    width: 30,
    marginBottom: -50,
    marginTop: -40,
    marginRight: 20,
    marginLeft: 300,
    transform: [{ scaleX: -1 }],
    alignItems: "center"
  },
  partecipantBoxContainer: {
    marginBottom: 30,
    alignItems: "stretch"
  }
})

export default PartecipantBox*/