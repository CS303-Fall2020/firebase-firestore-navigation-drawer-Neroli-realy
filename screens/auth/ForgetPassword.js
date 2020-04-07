import React , { useState }from 'react';
import {
    ActivityIndicator, 
    Alert, 
    StyleSheet, 
    View, 
    Button, 
    TextInput, 
    TouchableWithoutFeedback, 
    Keyboard } from 'react-native';
import {resetPassword} from '../../firebase/commands';

export default function ForgetPassword({navigation}){
    const [animate, setAnimate] = useState(false);
    const [email, setEmail] = useState();

    const onChange = async() => {
        Keyboard.dismiss();
        if(email != null){
            setAnimate(true);
            try{
               let response = await resetPassword(email);
               Alert.alert("Done", response);
            }catch(error){
                Alert.alert("ERROR", error);
            }
        }else{
            Alert.alert("ERROR", "Invalid Email");
        }
        setAnimate(false);
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
                    <Button onPress={onChange} title="Request Password"></Button>
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