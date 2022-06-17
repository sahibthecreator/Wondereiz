import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import { app, db } from "../Config";
import {
  doc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";

const tripLikeIcon = {
  name: "Like",
  imageUrl: "https://img.icons8.com/small/60/D50FBC/hearts.png",
  imageLikedUrl: "https://img.icons8.com/material/60/D50FBC/like--v1.png",
};

const Post = ({ post }) => {
  return (
    <TouchableOpacity style={{ marginBottom: 5 }} onPress={()=> post.props.navigation.navigate("TripDetails")}>
      <PostHeader post={post} />
      <View style={{ marginLeft: 320, marginTop: -30, alignSelf: "center" }}>
        <PostLike id={post.id} liked={post.liked} />
      </View>
    </TouchableOpacity>
  );
};

const PostHeader = ({ post }) => (
  <View style={styles.container}>
    <View style={styles.content}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image source={{ uri: post.trip_picture }} style={styles.trip} />
        <View style={{ flexDirection: "column" }}>
          <Text style={styles.tripInfo}>
            {post.trip}
          </Text>

          <Text style={styles.caption}>
            {post.caption}
          </Text>
        </View>
      </View>
    </View>
  </View>
);

const PostLike = ({ id, liked }) => {
  return <Icon id={id} liked={liked} imgStyle={styles.likeIcon} />;
};

const Icon = ({ imgStyle, id, liked }) => {
  const userUid = app.auth().currentUser.uid;
  const imageLikedUrl =
    "https://img.icons8.com/material/60/D50FBC/like--v1.png";
  const imageUrl = "https://img.icons8.com/small/60/D50FBC/hearts.png";
  const [likeIcon, SetLikeIcon] = useState(imageUrl);
  let [savedRoom, setSavedRoom] = useState("");
  useEffect(() => {
    console.log('useEffect called');
    SetLikeIcon(liked ? imageLikedUrl : imageUrl);
  }, []);
  const myDoc = doc(db, "User", userUid);

  function Create() {
    console.log(id)

    if (likeIcon == imageUrl) {
      SetLikeIcon(imageLikedUrl);

      updateDoc(myDoc, {
        savedRoomsId: arrayUnion(id),
      });
    } else {
      SetLikeIcon(imageUrl);

      updateDoc(myDoc, {
        savedRoomsId: arrayRemove(id),
      });
    }
  }

  return (
    <TouchableOpacity onPress={(savedRoom) => setSavedRoom(id) + Create()}>
      <Image style={imgStyle} source={{ uri: likeIcon }} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  trip: {
    marginLeft: 15,
    width: 70,
    height: 70,
    borderRadius: 50,
  },
  likeIcon: {
    width: 30,
    height: 30,
    bottom: 15,
  },
  container: {
    top: 35,
    margin: 10,
    paddingTop: 15,
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
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 5,
    alignItems: "center",
  },
  tripInfo: {
    color: "#8736AA",
    fontWeight: "bold",
    marginLeft: 15,
  },
  caption: {
    color: "#BFBFBF",
    fontWeight: "500",
    marginLeft: 15,
  }
});

export default Post;
