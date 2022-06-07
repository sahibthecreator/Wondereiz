import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { Component } from "react";
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ForgetPasswordScreen from './screens/ForgetPasswordScreen';
import HomeScreen from './screens/HomeScreen';
import BottomTabs from "./components/BottomTabs";
import GroupInfoScreen from "./screens/GroupInfoScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import MyTripsScreen from './screens/MyTripsScreen'
import AboutMeScreen from './screens/AboutMeScreen';

const {Navigator, Screen} = createStackNavigator();

const AppNavigator = () => (
    <NavigationContainer>
        <Navigator screenOptions={{ headerShown: false }} initialRouteName="Welcome">
            <Screen name="Welcome" component={WelcomeScreen} />
            <Screen name="Login" component={LoginScreen} />
            <Screen name="Register" component={RegisterScreen} />
            <Screen name="ForgetPassword" component={ForgetPasswordScreen} />
            <Screen name="Home" component={HomeScreen} />
            <Screen name="MyTrips" component={MyTripsScreen} />
            <Screen name="GroupInfoScreen" component={GroupInfoScreen} />
            <Screen name="AboutMe" component={AboutMeScreen} />
        </Navigator>
    </NavigationContainer>
);

export default AppNavigator;