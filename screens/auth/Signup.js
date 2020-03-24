import React , { useState, useEffect}from 'react';
import { Alert, StyleSheet, Text, View, Button,TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as firebase from 'firebase';

export default function Signup({ navigation }){
    const [signup, setsignup] = useState({});
    const onSignup = () => {
        if (signup.Password !== signup.Confirm) {
            Alert.alert("Error", "Passwords do not match");
            return;
        }
        if(signup.Password != null){

        firebase.auth().createUserWithEmailAndPassword(signup.Email, signup.Password)
            .then(() => { navigation.navigate('Home'); Keyboard.dismiss(); setsignup({})}, (error) => { Alert.alert("ERROR",error.message); });
        }
        else{ Alert.alert("ERROR", "Password cannot be empty")}
    }
    return(
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.upper}>
            <TextInput 
            placeholder="Enter Email" 
            style={styles.input}
            value={signup.Email}
            onChangeText={(text) => setsignup({Email: text, Password:signup.Password, Confirm:signup.Confirm})}/>
            <TextInput 
            placeholder="Enter Password" 
            style={styles.input}
            secureTextEntry={true}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={(text) => setsignup({Email: signup.Email, Password:text, Confirm:signup.Confirm})}/>
            <TextInput 
            placeholder="Enter Confirm Password" 
            style={styles.input}
            secureTextEntry={true}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={(text) => setsignup({Email: signup.Email, Password:signup.Password, Confirm:text})}/>
            <View style={styles.button}>
                <Button onPress={onSignup} title="click"></Button>
            </View>
            <View style={styles.lower}>
                <Button title="Login" onPress={() => navigation.navigate('Login')}/>
                <Button title="Forgot Password" onPress={() => navigation.navigate('Forgetpassword')}/>
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
        flex: 0.6,
        justifyContent: 'space-between',
        marginTop: 150,
        width: 250,
        
    },
    


});