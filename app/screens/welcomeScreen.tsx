import { View, StyleSheet, ImageBackground } from 'react-native';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import images from '@/assets/images';
import { supabase } from '@/lib/supabase';

const WelcomeScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      setTimeout(() => {
        if (session?.user) {
          navigation.navigate('HomeTabs' as never);
        } else {
          navigation.navigate('Signin' as never);
        }
      }, 1500);
    };

    checkSession();
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground source={images.WelcomePage}
        resizeMode='cover'
        style={styles.image} >
      </ImageBackground>

    </View>
  )
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  image: {
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
  },
})