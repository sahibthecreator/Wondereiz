import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { Component } from "react";
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ForgetPasswordScreen from './screens/ForgetPasswordScreen';


const {Navigator, Screen} = createStackNavigator();

const AppNavigator = () => (
    <NavigationContainer>
        <Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
            <Screen name="Login" component={LoginScreen} />
            <Screen name="Register" component={RegisterScreen} />
            <Screen name="ForgetPassword" component={ForgetPasswordScreen} />
        </Navigator>
    </NavigationContainer>
);

export default AppNavigator;