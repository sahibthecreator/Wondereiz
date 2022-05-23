import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { Component } from "react";
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';

const {Navigator, Screen} = createStackNavigator();

const AppNavigator = () => (
    <NavigationContainer>
        <Navigator headerMode="none" initialRouteName="Login">
            <Screen name="Login" component={LoginScreen} />
            <Screen name="Register" component={RegisterScreen} />
        </Navigator>
    </NavigationContainer>
);

export default AppNavigator;