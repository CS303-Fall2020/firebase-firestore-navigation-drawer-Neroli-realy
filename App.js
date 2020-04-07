import React , { useState, useEffect}from 'react';
import { StyleSheet,TouchableOpacity,Image, Text, View, Button, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import firebase from 'firebase';
import Login from './screens/auth/Login';
import Signup from './screens/auth/Signup';
import ForgetPassword from './screens/auth/ForgetPassword';
import Home from './screens/Todo/App';
import Details from './screens/Todo/screens/Details';
import {signout, init} from './firebase/commands';


const Stack = createStackNavigator();

let x = {};
export default function App() {
  const test = (navigation) => {
     x = navigation;
  }
  
  useEffect(() => {
    init();
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
        initialParams={{test: test}}
        options={{
          headerLeft: () =>(
            <TouchableOpacity onPress={() =>{x.toggleDrawer()}}>
              <Image style={{width: 30, height: 30, marginLeft: 10}} source={require('./assets/drawer.png')}/>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => {signout(); x.navigate('Login')}}>
            <Text style={{textDecorationLine: "underline", fontSize: 20}}>Signout</Text>
            </TouchableOpacity>
          )
        }}
        >
        </Stack.Screen>
        <Stack.Screen 
        name="Details"
        component={Details}
        />
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
