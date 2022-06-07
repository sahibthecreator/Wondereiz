import { 
    StyleSheet,
    Text,  
    Image,
  } from 'react-native';
  import { SafeAreaView } from "react-native-safe-area-context";
  import { app } from "../Config";
  import { LinearGradient } from "expo-linear-gradient";
  import { onAuthStateChanged } from "firebase/auth";
  
export default function Transition1(props) {
  onAuthStateChanged(app.auth(), (user) => {
    if (user) {
      //alert("Signed In");
      //props.navigation.navigate("TransitionPage2", { user });
    }
  });

  return (
    <LinearGradient colors={["#441B55", "#b61fb5"]} style={styles.background}>
      <SafeAreaView style={styles.container}>
        <Image style={styles.animatedImage}
          source={require("../assets/loading.gif")} />
        <Text style={styles.caption}>Your registration might take a few seconds...</Text>
        <Image style={styles.image} source={require("../assets/world.png")} />
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    background: {
      width: "100%",
      height: "100%",
      position: "relative",
    },
    animatedImage: {
      position: "absolute",
      top: "50%",
      width: 30,
      height: 30,
    },
    caption: {
      fontWeight: "bold",
      fontSize: 15,
      color: "#FFFFFF",
      marginTop: 40,
    },
    image: {
      position: "absolute",
      bottom: -60,
      right: 0,
      opacity: 0.5,
    }
})