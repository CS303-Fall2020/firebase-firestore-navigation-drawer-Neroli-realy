import React , { useState}from 'react';
import {
    ActivityIndicator, 
    Alert, StyleSheet, 
    View, 
    Button, 
    TextInput, 
    TouchableWithoutFeedback, 
    Keyboard } from 'react-native';
import {dosignup} from '../../firebase/commands';

export default function Signup({ navigation }){
    const [signup, setsignup] = useState({});
    const [animate, setAnimate] = useState(false);

    const onSignup = async() => {
        if (signup.Password !== signup.Confirm) {
            Alert.alert("Error", "Passwords do not match");
            return;
        }
        if(signup.Password != null){
            Keyboard.dismiss();
            setAnimate(true);
            try{
                let uid = await dosignup(signup.Email, signup.Password);
                navigation.navigate('Home', {uid: uid});
                console.log(uid);
            }catch(error){
                Alert.alert("ERROR", error);
            }
        }
        else{ Alert.alert("ERROR", "Password cannot be empty")}
        setAnimate(false);
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
            value={signup.Password}
            style={styles.input}
            secureTextEntry={true}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={(text) => setsignup({Email: signup.Email, Password:text, Confirm:signup.Confirm})}/>
            <TextInput 
            placeholder="Enter Confirm Password" 
            style={styles.input}
            secureTextEntry={true}
            value={signup.Confirm}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={(text) => setsignup({Email: signup.Email, Password:signup.Password, Confirm:text})}/>
            
            <View style={styles.button}>
                <Button onPress={onSignup} title="SignUp"></Button>
            </View>
            
            <View style={styles.lower}>
            {animate && (
                <ActivityIndicator
                  style={{ height: 80 }}
                  color="#C00"
                  size="large"
                />
              )}
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