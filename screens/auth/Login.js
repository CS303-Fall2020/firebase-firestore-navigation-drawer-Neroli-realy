import React , { useState, useEffect}from 'react';
import {ActivityIndicator, Alert, StyleSheet, Text, View, Button,TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ApiKeys from '../../constants/APIkeys';

import * as firebase from 'firebase';



export default function Login({ navigation }){

    
    const [login , setlogin] = useState({});
    const [animate, setAnimate] = useState(false);

    const onLogin = () => {
        Keyboard.dismiss();
        setAnimate(true);
        firebase.auth().signInWithEmailAndPassword(login.Email, login.Password)
        .then(() => { setAnimate(false); navigation.navigate('Home', login.Email); Keyboard.dismiss(); setlogin({})}, (error) => { setAnimate(false);Alert.alert("ERROR", error.message); });
        
    }
    
    return(
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.upper}>
                <TextInput defaultValue={login.Email} onChangeText={(text) => setlogin({Email: text, Password: login.Password})} placeholder="Enter Email" style={styles.input}></TextInput>
                <TextInput 
                placeholder="Enter Password" 
                style={styles.input}
                defaultValue={login.Password} 
                onChangeText={(text) => setlogin({Email: login.Email,Password: text})}
                secureTextEntry={true}
                autoCapitalize="none"
                autoCorrect={false}/>
                <View style={styles.button}>
                    <Button onPress={onLogin} title="click"></Button>
                </View>
                {animate && (
                    <ActivityIndicator
                      style={{ height: 80 }}
                      color="#C00"
                      size="large"
                    />
                  )}
                <View style={styles.lower}>
                    <Button title="Signup" onPress={() => navigation.navigate('Signup')}/>
                    <Button title="Forgot Password" onPress={() => navigation.navigate('Forgetpassword')} />
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    upper: {
        flex: 1,
        paddingTop: 50,
        alignItems: 'center',
        
    },
    input: {
        width: 300,
        height: 40,
        borderWidth: 1,
        marginBottom: 10,
        borderStyle: 'dashed',
        borderRadius: 2,
    },
    button:{
        width: 250,
        marginTop: 20
    },
    lower: {
        flex: 0.5,
        justifyContent: 'space-between',
        marginTop: 200,
        width: 250,
        
    },
    


});