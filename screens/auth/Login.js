import React , {useState}from 'react';
import {
    ActivityIndicator, 
    Alert, StyleSheet, 
    View, 
    Button, 
    TextInput, 
    TouchableWithoutFeedback, 
    Keyboard } from 'react-native';
import {dologin} from '../../firebase/commands';

export default function Login({ navigation }){
    
    const [login , setlogin] = useState({});
    const [animate, setAnimate] = useState(false);
    
    const onLogin = async() => {
        let uid;
        Keyboard.dismiss();
        if(login.Email != null && login.Password != null){
            setAnimate(true);
            try{
            uid = await dologin(login.Email, login.Password); 
            navigation.navigate('Home',{uid: uid});
            setlogin({});
            }catch(error){
                Alert.alert("ERROR",error.toString());
            }
            setAnimate(false);
        }
        else{
            Alert.alert("Invalid Credentials","Email and Password must not be empty");
        }

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
                    <Button onPress={onLogin} title="Login"></Button>
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