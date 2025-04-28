import { View, Text, StyleSheet, ImageBackground } from 'react-native'
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import images from '@/assets/images';
import { useUser } from '../context/userSessionContext';

const WelcomeScreen = () => {
    const navigation = useNavigation();
    const { user } = useUser();

    useEffect(() => {
        if(user)
          setTimeout(() => navigation.navigate('HomeTabs' as never), 3000);
        else
          setTimeout(() => navigation.navigate('Signin' as never), 3000);
    },[user]);

  return (
        <View style={styles.container}>
            <ImageBackground source={images.Background}
                    resizeMode='cover'
                    style={styles.image} >
                <Text style={styles.text}>Let's get cooking!</Text>
            </ImageBackground>
            
        </View>
  )
}

export default WelcomeScreen;

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