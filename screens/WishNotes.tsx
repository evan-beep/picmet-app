import * as React from 'react';
import { useState } from 'react';
import { View, Button, TouchableOpacity, StyleSheet, TextInput, Image, FlatList, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import { Text } from 'react-native-paper';

const initWish = ''
import firebase from 'firebase/app'

// Optionally import the services that you want to use
import "firebase/auth";
import "firebase/database";
//import "firebase/firestore";
//import "firebase/functions";
import "firebase/storage";
import { Alert } from 'react-native';

// Initialize Firebase
var firebaseConfig = {
  apiKey: "AIzaSyC4sYfz1pRXlf1AobgQ69aDMzw3F3imGQo",
  authDomain: "picmet-app.firebaseapp.com",
  databaseURL: "https://picmet-app-default-rtdb.firebaseio.com",
  projectId: "picmet-app",
  storageBucket: "picmet-app.appspot.com",
  messagingSenderId: "1040692554774",
  appId: "1:1040692554774:web:ae603f95751b34ae465937",
  measurementId: "G-8RNR9L5QHF"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}


export default function WishNotes({ navigation }: { navigation: any }) {
  const [wishnote, setWishnote] = useState(initWish);
  function saveWishNote() {
    firebase.auth().onAuthStateChanged(async function (user) {
      if (user) {
        let user_email = user.email;
        let user_list = firebase.database().ref('user_list');
        await user_list.once('value').then(function (snapshot) {
          snapshot.forEach(function (childSnapshot) {
            var childData = childSnapshot.val();
            if (childData.email == user_email) {
              firebase.database().ref('user_list/' + childSnapshot.key + "/wish_list").remove();
              firebase.database().ref('user_list/' + childSnapshot.key + "/wish_list").push(
                wishnote
              )
            }
          })
        })
        Alert.alert("儲存成功", "已更新願望小清單！");
      }
      else {
        Alert.alert("儲存失敗", "請先登入才可添加願望小清單！");
      }
    })
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', backgroundColor: '#B184CF' }}>
        <View style={{ width: '100%', display: 'flex', height: 100, justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
          <Text style={{ fontSize: 35, fontWeight: '600', color: 'white' }}>
            願望筆記
          </Text>
        </View>
        <KeyboardAvoidingView style={{ height: '100%', width: '100%', justifyContent: 'flex-start', alignItems: 'center' }}>
          <TextInput
            onChangeText={setWishnote}
            value={wishnote}
            placeholder={'我想要⋯⋯'} multiline={true} style={{ width: '85%', height: '50%', fontSize: 25, fontWeight: '500', color: 'white' }}>

          </TextInput>
        </KeyboardAvoidingView>
        <View style={{ width: 200, height: 200, borderRadius: 100, backgroundColor: '#DE75BE', position: 'absolute', bottom: -50, right: -50 }} />
        <View style={{ width: 400, height: 400, borderRadius: 200, backgroundColor: '#71D0DA', position: 'absolute', bottom: -100, left: -100 }} />

        <TouchableOpacity onPress={saveWishNote} style={{ width: 300, height: 300, borderRadius: 200, backgroundColor: '#7CAEDE', position: 'absolute', bottom: -150, alignItems: 'center' }}>
          <Text style={{ fontSize: 30, color: 'white', marginTop: 80, fontWeight: '600' }}>
            Save
          </Text>
        </TouchableOpacity>
      </View>


    </TouchableWithoutFeedback>
  )
}
