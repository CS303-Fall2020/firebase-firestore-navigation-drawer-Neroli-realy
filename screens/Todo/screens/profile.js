import React from 'react';
import { Alert, StyleSheet, Text, View, Button,TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';

export default function profile(){
    return(
        <View style={{flex: 1}}>
          <View style={styles.task}>
          </View> 
        <View style={styles.container}>
            <Text>hi PROFILE</Text>
         </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
      borderColor: '#bbb',
      borderWidth: 1,
      borderRadius: 2,
      borderStyle: 'dashed',
      marginTop: 15,
    },
    task: {
        width: 50,
        height: 50,
        marginLeft: 155,
        borderColor: '#bbb',
        borderWidth: 3,
        borderRadius: 2,
        borderStyle: 'dashed',
        marginTop: 15,
    },
    image: {
      height: 20,
      width: 20,
    },
    checkbox: {
  
    }
  
  })
  