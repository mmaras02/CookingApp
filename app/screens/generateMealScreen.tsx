import { View, Text, StyleSheet, Animated } from 'react-native'
import { useCallback, useEffect, useRef, useState } from 'react';
import ReturnPage from '../navigation/returnPage';
import LottieView from 'lottie-react-native';
import { Button } from 'react-native-paper';
import { useMealDetails } from '@/app/hooks';
import { globalStyles } from '@/styles';
import { MealItem } from '@/app/components';

const GenerateMealScreen = () => {
    const [randomId, setRandomId] = useState<number | null>(null);
    const [scale] = useState(new Animated.Value(1.2));
    const confettiRef = useRef<LottieView>(null);

    const { data } = useMealDetails(randomId  ?? 0);
    const randomMeal = data?.meal;

    const handlePress = useCallback(() => {
        if(confettiRef.current){
          confettiRef.current.play(0);
        }

        Animated.sequence([
          Animated.spring(scale, { toValue: 1.4, friction: 3, useNativeDriver: true }),
          Animated.spring(scale, { toValue: 1.2, friction: 3, useNativeDriver: true }),
        ]).start();

      const newRandomId = Math.floor(Math.random() * 13) + 1;
      setRandomId(newRandomId);

    },[scale]);

    useEffect(() => {
      if (randomMeal && confettiRef.current) {
          confettiRef.current.play(0);
      }
  }, [randomMeal]);

  return (
    <View style={styles.container}>
      <ReturnPage title='Generate random meal'/>
      <View style={styles.generateSection}>
        {/*<Text style={globalStyles.TitleText}>Generate random meal</Text>*/}
        <Button onPress={handlePress} style={styles.button}>
          <Text style={globalStyles.text}>Generate</Text>
        </Button >

        {randomMeal && (
          
          <View style={styles.imageContainer}>
          <LottieView
              ref={confettiRef}
              source={require('@/assets/confetti.json')}
              autoPlay={false}
              loop={false}
              style={styles.lottie}
              resizeMode='cover'
              
            />
            <Animated.View style={[styles.animatedImageContainer, { transform: [{ scale }] }]}>
              <MealItem meal={randomMeal} />
            </Animated.View>
          </View>)}
      </View>
      
    </View>
  )
}
export default GenerateMealScreen

const styles = StyleSheet.create({
  generateSection: {
    flex: 1,
    alignItems: 'center', 
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
  },
  container: {
    flex: 1,
  },
  animatedImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  button: {
    height: 50,
    width: 140,
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#f2a76d',
  },
  lottie: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
    pointerEvents: 'none',
  },
})