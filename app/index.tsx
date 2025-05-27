import React from 'react';
import Layout from './_layout';
import { UserProvider } from './context/AuthContext';
import { disableFontScaling } from './utils';
import { ActivityIndicator } from 'react-native';
import { useFonts } from 'expo-font';

disableFontScaling();

const App = () => {
  const [fontsLoaded] = useFonts({
    'Montserrat-Regular': require('../assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-Bold': require('../assets/fonts/Montserrat-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <UserProvider>
      <Layout />
    </UserProvider>
  )
}

export default App;
