import React from 'react';
import {View,Text,StyleSheet,SafeAreaView,Image} from 'react-native';
import BottomTabs from "../components/BottomTabs";
import PropTypes from 'prop-types';

export default function NotificationsPage(props) {
    return (
        <SafeAreaView style={styles.container}>
          {/* header section */}
          <View style={styles.header}>
              <Text style={styles.caption}>Messages</Text>
          </View>
          {/* main section for showing Notification */}
          <View style={styles.main}>
                <View style={styles.mainPic}>
                  <Image
                    source={{
                      uri: "https://media.cntraveller.com/photos/611be7c7a106ea5ed3099f8c/4:3/w_2664,h_1998,c_limit/amsterdam-mag-jan19-matthew-buck23.jpg",
                    }}
                    style={styles.groupImg}
                  />
                </View>
                <View style={styles.mainText}>
                    <Text style={styles.msgTitle}>
                      Eindhoven - Amsterdam
                    </Text>
                    <Text style={styles.msgDate}>
                      15 June 2022
                    </Text>
                    <Text style={styles.msgText}>
                      Violetta: Hi everyone
                    </Text>
                </View>
                <View style={styles.mainTime}>
                  <Text style={styles.msgTime}>
                    11:30
                  </Text>
                  <Text style={styles.unreadMsg}>
                    2
                  </Text>
    
                </View>
          </View>
          <View style={styles.footer}>
          <BottomTabs navigation={props.navigation} />
          </View>
          
        </SafeAreaView>
      )
};

// export default NotificationsPage;

//styling for the page
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "space-around",
    //justifyContent: 'center',
    backgroundColor: "white",
  },
  header: {
    alignItems: "center",
    marginTop: 50,
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 20,
  },
  caption: {
    fontSize: 25,
    fontWeight: "500",
    color: "#b61fb5",
  },
  main: {
    flex: 1,
    flexDirection:'row',
    marginLeft: 30,
    marginTop: 20,
  },
  groupImg: {
    marginLeft: 1,
    // marginTop: 20,
    width: 60,
    height: 60,
    borderRadius: 30
  },
  
  mainPic: {
    marginLeft: 30,

  },
  mainText: {
    width: '60%',
    marginTop:2,
    marginLeft: 20,
    
  },
  msgTitle: {
    fontSize: 15,
    fontWeight: "500",
    color: "#b61fb5",
  },
  msgDate: {
    // width: '20%',
    fontSize: 10,
    fontWeight: "500",
    color: '#D5D1DA',
  },
  msgText: {
    fontSize: 12,
    fontWeight: "500",
    color: '#54617F',
  },
  mainTime: {
    width:'20%',
    fontSize: 12,
    fontWeight: "500",
    color: '#D5D1DA',
  },
  msgTime: {
    marginTop: 10,
    fontSize: 12,
    fontWeight: "500",
    color: '#54617F',
  },
  unreadMsg: {
      marginTop:10,
  },
  footer: {
    width: '100%',
    height: 30,
  }

});