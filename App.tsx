
import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './screens/HomeScreen';
import MainProductPage from './screens/NextScreen';
import StartSceen from './screens/StartScreen';
import LoginScreen from './screens/LoginScreen';

import { TransitionSpec } from '@react-navigation/stack/lib/typescript/src/types';
import RegisterScreen from './screens/RegisterScreen';

import { Provider } from 'react-native-paper'
const Stack = createStackNavigator();

function App() {

  const config: TransitionSpec = {
    animation: 'spring',
    config: {
      stiffness: 1000,
      damping: 500,
      mass: 3,
      overshootClamping: true,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    },
  };

  return (
    <Provider>

      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Start" component={StartSceen} options={{
            transitionSpec: {
              open: config,
              close: config,
            },
          }} />
          <Stack.Screen name="Home" component={HomeScreen} options={{
            transitionSpec: {
              open: config,
              close: config,
            },
          }} />
          <Stack.Screen name="Login" component={LoginScreen} options={{
            transitionSpec: {
              open: config,
              close: config,
            },
          }} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{
            transitionSpec: {
              open: config,
              close: config,
            },
          }} />

          <Stack.Screen name="Main" component={MainProductPage} options={{
            transitionSpec: {
              open: config,
              close: config,
            },
          }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>

  );
}

export default App;
