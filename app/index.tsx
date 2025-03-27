import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './screens/welcomeScreen';
import HomeScreen from './screens/homeScreen';
const Stack = createNativeStackNavigator();

function App() {
  return (
      <Stack.Navigator initialRouteName='Welcome' screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
  );
}

export default App;