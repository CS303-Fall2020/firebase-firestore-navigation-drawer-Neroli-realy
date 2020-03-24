import React , { useState, useEffect}from 'react';
import {ActivityIndicator, Alert, StyleSheet, Text, View, Button,TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as firebase from 'firebase';

export default function ForgetPassword({navigation}){

    const [animate, setAnimate] = useState(false);
    const [email, setEmail] = useState();
    const onChange = () => {
        setAnimate(true);
        firebase.auth().sendPasswordResetEmail(email)
            .then(() => { setAnimate(false);
                Alert.alert("Done", "Password reset email has been sent.");
            }, (error) => {setAnimate(false);
                Alert.alert("ERROR", error.message);
            });
    }
    return(
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.upper}>
                <TextInput 
                placeholder="Enter Email" 
                style={styles.input} 
                value={email}
                onChangeText={(text) => setEmail(text)}/>
                <View style={styles.button}>
                    <Button onPress={onChange} title="click"></Button>
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
                    <Button title="Login" onPress={() => navigation.navigate('Login')}/>
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
        flex: 0.4,
        justifyContent: 'space-between',
        marginTop: 200,
        width: 250,
        
    },
    


});