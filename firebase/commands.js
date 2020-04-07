import firebase, { firestore } from 'firebase';
import {useState} from 'react';
import '@firebase/firestore';
import ApiKeys from '../constants/APIkeys';


let uid = null;
export  function dologin(email, password){
    uid = null;
    let response;
    return new Promise(function(resolve, reject) {
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((data) => { response = data.user.uid;uid = data.user.uid; resolve(response);}, (error) => { reject(error.message); });
    });
}


export function dosignup(email, password){
    return new Promise(function(resolve, reject){
         firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((data) => {
                resolve(data.user.uid);
               
            }, (error) => { 
                reject(error.message) 
            });
            
    });
}

export function resetPassword(email){
    return new Promise(function(resolve, reject){
    firebase.auth().sendPasswordResetEmail(email)
            .then(() => {
                resolve("Password reset email has been sent.");
            }, (error) => {
                reject(error.message);
            });
    })
}

export function signout(){
    uid = null;
    firebase.auth().signOut();
}

export function init(){
    if (!firebase.apps.length) { firebase.initializeApp(ApiKeys.FirebaseConfig); 

       
        }
}

export function setTodo(id, name, Checked){
    console.log('here: ' + id + ", " + uid);
    firebase.firestore().collection('Users').doc(uid).collection('ToDos').doc(id).set({
        name: name,
        Checked: Checked,
        key: id
    });
}

export function getTodos(uid){
    let list = [];
    return new Promise(async function(resolve, reject){
    (await firebase.firestore().collection('Users').doc(uid).collection('ToDos').get()).forEach(doc => {
        const {name, Checked} = doc.data();
        list.push({
          name: name,
          Checked: Checked,
          key: doc.id
          })
      });
      resolve(list);
    });
}

export function deleteTodo(id){
    console.log(id);
    firebase.firestore().collection('Users').doc(uid).collection('ToDos').doc(id).delete();
}
export default function() {
    return null;
}