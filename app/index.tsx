import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './screens/welcomeScreen';
import HomeScreen from './screens/homeScreen';
import MealDetailsScreen from './screens/mealDetailsScreen';
import { ParamsList } from './types/ParamsList';

const Stack = createNativeStackNavigator<ParamsList>();


function App() {
  return (
      <Stack.Navigator initialRouteName='Welcome' screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="MealDetails" component={MealDetailsScreen} />
      </Stack.Navigator>
  );
}

export default App;