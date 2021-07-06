import * as React from 'react';
import { useState } from 'react';
import { View, Button, TouchableOpacity, StyleSheet, TextInput, Image, FlatList, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import { Text } from 'react-native-paper';

const initWish = ''

export default function WishNotes({ navigation }: { navigation: any }) {
  const [wishnote, setWishnote] = useState(initWish);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', backgroundColor: '#B184CF' }}>
        <View style={{ width: '100%', display: 'flex', height: 100, justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
          <Text style={{ fontSize: 35, fontWeight: '600', color: 'white' }}>
            願望筆記
          </Text>
        </View>
        <KeyboardAvoidingView style={{ height: '100%', width: '100%', justifyContent: 'flex-start', alignItems: 'center' }}>
          <TextInput placeholder={'我想要⋯⋯'} multiline={true} style={{ width: '85%', height: '50%', fontSize: 25, fontWeight: '500', color: 'white' }}>

          </TextInput>
        </KeyboardAvoidingView>
        <View style={{ width: 200, height: 200, borderRadius: 100, backgroundColor: '#DE75BE', position: 'absolute', bottom: -50, right: -50 }} />
        <View style={{ width: 400, height: 400, borderRadius: 200, backgroundColor: '#71D0DA', position: 'absolute', bottom: -100, left: -100 }} />

        <TouchableOpacity style={{ width: 300, height: 300, borderRadius: 200, backgroundColor: '#7CAEDE', position: 'absolute', bottom: -150, alignItems: 'center' }}>
          <Text style={{ fontSize: 30, color: 'white', marginTop: 80, fontWeight: '600' }}>
            Save
          </Text>
        </TouchableOpacity>
      </View>


    </TouchableWithoutFeedback>
  )
}
