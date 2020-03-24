import React from 'react';
import { Alert, StyleSheet, Text, View, Button,TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';

export default function Home({route}){
    return(
        <Text>hi {route.params}</Text>
    )
}