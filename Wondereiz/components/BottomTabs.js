import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Image, Text } from "react-native";

const icons = {
  Home: {
    active: "https://img.icons8.com/material-sharp/24/FFFFFF/home.png",
  },
  Search: {
    active: "https://img.icons8.com/ios-glyphs/60/FFFFFF/search--v1.png",
  },
  Trips: {
    active: "https://img.icons8.com/ios-glyphs/60/FFFFFF/train.png",
  },
  Notification: {
    active:
      "https://img.icons8.com/external-kosonicon-outline-kosonicon/64/FFFFFF/external-message-chat-messages-kosonicon-outline-kosonicon-21.png",
  },
  Profile: {
    active:
      "https://img.icons8.com/material/60/FFFFFF/user-male-circle--v1.png",
  },
};

const BottomTabs = (props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Image
          source={{
            uri: icons.Home.active,
          }}
          style={styles.icon}
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <Image
          source={{
            uri: icons.Search.active,
          }}
          style={styles.icon}
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <Image
          source={{
            uri: icons.Trips.active,
          }}
          style={styles.icon}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => props.navigation.navigate("GroupInfoScreen")}>
        <Image
          source={{
            uri: icons.Notification.active,
          }}
          style={styles.icon}
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <Image
          source={{
            uri: icons.Profile.active,
          }}
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    height: 70,
    paddingTop: 12,
    backgroundColor: "#D50FBC",
    marginBottom: -35,
  },
  icon: {
    width: 30,
    height: 30,
  },
});

export default BottomTabs;
