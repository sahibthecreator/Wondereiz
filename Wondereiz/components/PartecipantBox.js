import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'

const PartecipantBox = ({ post }) => {
  return (
    <View style={{ marginBottom: 30 }}>
      <PartecipantBoxHeader post={post} />
    </View>
  )
}

const PartecipantBoxHeader = ({ post }) => (
  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Image source={{ uri: post.partecipant_picture }} style={styles.partecipantBox} />
      <Text style={styles.caption}>
        {post.caption}
      </Text>
    </View>
    <TouchableOpacity>
      <Image
        source={{
          uri: "https://img.icons8.com/ios-glyphs/30/D50FBC/back.png",
        }}
        style={styles.icon}
      />
    </TouchableOpacity>
  </View>
)

const styles = StyleSheet.create({
  partecipantBox: {
    width: 50,
    height: 50,
    marginLeft: 10,
    marginTop: 15,
    borderRadius: 40,
  },
  icon: {
    height: 30,
    width: 30,
    marginTop: 15,
    marginRight: 20,
    transform: [{ scaleX: -1 }]
  },
  caption: {
    color: "#4B4B4B",
    fontWeight: "500",
    fontSize: 18,
    marginLeft: 35,
    marginTop: 10
  }
})

export default PartecipantBox