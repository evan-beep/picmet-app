import * as React from 'react';
import { useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function RegisterScreen({ navigation }: { navigation: any }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const [passVisible, setPassVisible] = useState(false);


  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [bday, setBday] = useState(null);


  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: any) => {
    setBday(date);
    hideDatePicker();
  };

  function register(u: string, e: string, p: string) {
    navigation.navigate('Main');

  }

  function togglePassVisible() {
    if (passVisible) {
      setPassVisible(false)
    } else {
      setPassVisible(true)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Image
            style={[styles.backButton, { resizeMode: 'contain' }]}
            source={require('../assets/backarrow.png')} />
        </TouchableOpacity>
      </View>
      <View style={styles.midContainer}>
        <View style={[styles.loginTXT, styles.midCol]}>
          <Image
            style={[styles.loginTXT, { resizeMode: 'contain' }]}
            source={require('../assets/registerTXT.png')}
          />
        </View>
        <View style={[styles.textInputBG, styles.midCol]}>
          <TextInput
            style={styles.input}
            onChangeText={setUsername}
            value={username}
            placeholder="使用者名稱"
          />
        </View>
        <View style={[styles.textInputBG, styles.midCol]}>
          <TextInput
            style={styles.input}
            onChangeText={setEmail}
            value={email}
            placeholder="Email"
          />
        </View>
        <View style={[styles.textInputBG, styles.midCol]}>
          <TextInput
            style={styles.input}
            secureTextEntry={!passVisible}
            onChangeText={setPassword}
            value={password}
            placeholder="Password"
          />
          <TouchableOpacity
            onPress={() => togglePassVisible()}
            style={styles.visibility}>
            <Image
              style={[{
                height: 30,
                width: 30,
                resizeMode: 'contain',
                opacity: 0.5
              }]}
              source={passVisible ? require('../assets/visible.png') : require('../assets/invisible.png')}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={showDatePicker}
          style={[styles.midCol, styles.textInputBG, {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#7CAEDE'
          }]}>
          <Text style={{
            fontSize: 20,
            color: 'white',
            fontWeight: '700'
          }}>
            選擇生日{bday ? '：' + bday.toISOString().substring(0, 10) : ''}
          </Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />


        <View>
          <TouchableOpacity
            onPress={() => register(username, email, password)}
            style={[styles.midCol, styles.textInputBG, {
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#71D0DA'
            }]}>
            <Text style={{
              fontSize: 20,
              color: 'white',
              fontWeight: '700'
            }}>
              註冊
            </Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.midCol, {
          height: 80,
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center'
        }]}>
          <TouchableOpacity style={styles.socialMediaButton}>

          </TouchableOpacity>
          <TouchableOpacity style={styles.socialMediaButton}>

          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: '#B184CF',
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center'
    //justifyContent: 'center'
  },
  topContainer: {
    width: '90%',
    height: '10%',
    marginTop: '10%',
    display: 'flex',
    justifyContent: 'center',
    //backgroundColor: 'red'
  },
  midContainer: {
    width: '80%',
    height: '50%',
    display: 'flex',
    //backgroundColor: 'red',
    flexDirection: 'column',
  },
  backButton: {
    width: 50,
    height: 50,
    //resizeMode: 'contain',
    display: 'flex'
  },
  loginTXT: {
    width: '100%',
    height: 50
  },
  input: {
    height: 50,
    marginLeft: 10,
    fontSize: 25
  },
  textInputBG: {
    width: '100%',
    height: 55,
    backgroundColor: 'white',
    borderRadius: 8,
    display: 'flex',
    justifyContent: 'center'
  },
  midCol: {
    marginTop: 25
  },
  socialMediaButton: {
    width: '40%',
    height: 60,
    backgroundColor: 'white',
    borderRadius: 20
  },
  visibility: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
    position: 'absolute',
    right: 15
  }

});