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
import TransitionPage1Screen from "./screens/TransitionPage1Screen";
import TransitionPage2Screen from "./screens/TransitionPage2Screen";
import TripDetailsScreen from "./screens/TripDetailsScreen";
import FiltersScreen from "./screens/FiltersScreen";

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
            <Screen name="GroupInfo" component={GroupInfoScreen} />
            <Screen name="TransitionPage1" component={TransitionPage1Screen} />
            <Screen name="TransitionPage2" component={TransitionPage2Screen} />
            <Screen name="TripDetails" component={TripDetailsScreen} />
            <Screen name="Filters" component={FiltersScreen} />
        </Navigator>
    </NavigationContainer>
);

export default AppNavigator;