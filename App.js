import React , { useState, useEffect}from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ApiKeys from './constants/APIkeys';
import * as firebase from 'firebase';
import Login from './screens/auth/Login';
import Signup from './screens/auth/Signup';
import ForgetPassword from './screens/auth/ForgetPassword';
import Home from './screens/Todo/Home';

const Stack = createStackNavigator();

export default function App() {
  
  useEffect(() => {
    if (!firebase.apps.length) { firebase.initializeApp(ApiKeys.FirebaseConfig); }
  }
)
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen 
        name="Signup" 
        component={Signup}
        options={{
          headerLeft: () => {}
        }}
        />
        <Stack.Screen 
        name="Forgetpassword" 
        component={ForgetPassword}
        options={{
          headerLeft: () => {}
        }}/>
        <Stack.Screen 
        name="Home"
        component={Home}
        options={{
          headerLeft: () => {}
        }}/>
       </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
