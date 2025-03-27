import { View, Text, StyleSheet, ImageBackground } from 'react-native'
import backgroundImg from '@/assets/images/PestoPasta.jpg'
import React, { useEffect } from 'react';
import { useNavigation } from 'expo-router';

const WelcomeScreen = () => {
    const navigation = useNavigation();
    useEffect(() => {
        setTimeout(() => navigation.navigate('Home'), 3000);
    },[]);

  return (
        <View style={styles.container}>
            <ImageBackground source={backgroundImg}
                    resizeMode='cover'
                    style={styles.image} >
                <Text style={styles.text}>Let's get cooking!</Text>
            </ImageBackground>
            
        </View>
    
  )
}

export default WelcomeScreen

const styles = StyleSheet.create({
  container:{
    flex: 1,
    flexDirection: 'column',
  },
  image: {
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
  },
  text:{
    color: 'white',
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
})