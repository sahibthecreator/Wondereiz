import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'

const PartecipantBox = ({post}) => {
    return (
        <View style={{ marginBottom: 30 }}>
            <PartecipantBoxHeader post={post}/>
        </View>
    )
}

const PartecipantBoxHeader = ({ post }) => (
    <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 5, alignItems: 'center'}}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image source={{ uri: post.partecipant_picture }} style={styles.partecipantBox} />
        <Text
          style={{
            color: "#8736AA",
            fontWeight: "bold",
            marginLeft: 15,
            marginBottom: 25,
          }}
        >
          {" "}
          {post.partecipant}{" "}
        </Text>
        <Text
          style={{
            color: "#BFBFBF",
            fontWeight: "500",
            marginLeft: -173,
            marginTop: 15,
          }}
        >
          {" "}
          {post.caption}{" "}
        </Text>
      </View>
    </View>
)

const styles = StyleSheet.create({
    partecipantBox: {
        width: 35,
        height: 35,
        borderRadius: 50,
        marginLeft: 6,
        borderWidth: 1.6
    }
})

export default PartecipantBox