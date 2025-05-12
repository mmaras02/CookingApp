import React, { useCallback } from 'react';
import Layout from './_layout';
import { UserProvider } from './context/userSessionContext';
import { useFonts } from 'expo-font';
import { SplashScreen } from 'expo-router';
import { View } from 'react-native';

const App = () => {
    const [fontsLoaded] = useFonts({
    'Montserrat-Regular': require('../assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-Bold': require('../assets/fonts/Montserrat-Bold.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;
  
    return (
        <UserProvider>
            <View onLayout={onLayoutRootView}>
                <Layout />    
            </View>
        </UserProvider>
    )
}

export default App;