import images from '@/assets/images';
import { View, StyleSheet, ImageBackground, InteractionManager } from 'react-native';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '@/lib/supabase';

const WelcomeScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const runAfterInteractions = async () => {
      await InteractionManager.runAfterInteractions(async () => {
        try {
          const { data, error } = await supabase.auth.getSession();
          const session = data?.session;

          setTimeout(() => {
            if (session?.user) {
              navigation.navigate('HomeTabs' as never);
            } else {
              navigation.navigate('Signin' as never);
            }
          }, 1500);
        } catch (err) {
          console.error('Error fetching session:', err);
          navigation.navigate('Signin' as never);
        }
      });
    };

    runAfterInteractions();
  }, []);


  return (
    <View style={styles.container}>
      <ImageBackground source={images.WelcomePage}
        resizeMode='cover'
        style={styles.image} />
    </View>
  )
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#558d77',
  },
  image: {
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
  },
})