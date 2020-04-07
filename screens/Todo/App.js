import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import Homee from './screens/Home';
import { decode, encode } from "base-64";
import profile from './screens/profile';
import {signout} from '../../firebase/commands';

if (!global.btoa) {
global.btoa = encode;
}

if (!global.atob) {
global.atob = decode;
}
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

 function App({route, navigation}) {
   const [spla, setSpla] = useState(true);
   
   useEffect(() => {
     //console.log("hi: " +route.params);
      })
  return (
    <Drawer.Navigator initialRouteName="Homee">
      <Drawer.Screen name="Homee" component={Homee} initialParams={route.params}>
      </Drawer.Screen>
      <Drawer.Screen 
      name="Profile" 
      component={profile} 
      options = {{
        drawerLabel : () =>  (
            <View style = {{flexDirection: 'row'}}>
                <Button title ="signout" onPress = {() => {
                  signout();
                    navigation.navigate('Login') ; 
                }}/> 
                <Text style = {{marginLeft: 20, fontSize: 20}}>profile</Text>
            </View>
        ),
        // drawerLabel : 'profile'

    }}/>
    </Drawer.Navigator>
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

export default App;