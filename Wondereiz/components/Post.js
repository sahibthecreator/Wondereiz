import { View, Text, Image, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";

const tripLikeIcon = [
  {
    name: "Like",
    imageUrl: "https://img.icons8.com/small/60/D50FBC/hearts.png",
    imageLikedUrl: "https://img.icons8.com/ios-filled/50/D50FBC/hearts.png",
  },
];

const Post = ({ post }) => {
  return (
    <View style={{ marginBottom: 5 }}>
      <PostHeader post={post} />
      <View style={{ marginLeft: 320, marginTop: -30, alignSelf: "center" }}>
        <PostLike />
      </View>
    </View>
  );
};

const PostHeader = ({ post }) => (
  <View
    style={{
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
    }}
  >
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        margin: 5,
        alignItems: "center",
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image source={{ uri: post.trip_picture }} style={styles.trip} />
        <View style={{flexDirection: "column"}}>
        <Text
          style={{
            color: "#8736AA",
            fontWeight: "bold",
            marginLeft: 15,
          }}
        >  
          {post.trip}
        </Text>
        
          <Text
            style={{
              color: "#BFBFBF",
              fontWeight: "500",
              marginLeft: 15
            }}
          >
            {post.caption}
          </Text>
        </View>
      </View>
    </View>
  </View>
);

const PostLike = () => (
  <Icon imgStyle={styles.likeIcon} imageUrl={tripLikeIcon[0].imageUrl} />
);

const Icon = ({ imgStyle, imageUrl }) => (
  <TouchableOpacity >
    <Image style={imgStyle} source={{ uri: imageUrl }} />
  </TouchableOpacity>
);

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
});

export default Post;
