import ReturnPage from '../navigation/returnPage';
import LottieView from 'lottie-react-native';
import { View, Text, StyleSheet, Animated } from 'react-native'
import { useCallback, useRef, useState } from 'react';
import { Button } from 'react-native-paper';
import { globalStyles } from '@/styles';
import { ConfettiAnimation, MealItem } from '@/app/components';
import { Meal } from '@/app/types';
import { useMeals } from '../hooks';

const GenerateMealScreen = () => {
  const [randomMeal, setRandomMeal] = useState<Meal | null>(null);
  const { data: meals, isLoading } = useMeals();
  const [scale] = useState(new Animated.Value(1.2));
  const confettiRef = useRef<LottieView>(null);

  const handlePress = useCallback(() => {
    if (!meals?.length) return;

    if (confettiRef.current) confettiRef.current.play(0);
    Animated.sequence([
      Animated.spring(scale, { toValue: 1.4, friction: 3, useNativeDriver: true }),
      Animated.spring(scale, { toValue: 1.2, friction: 3, useNativeDriver: true }),
    ]).start();

    const randomIndex = Math.floor(Math.random() * meals.length);
    setRandomMeal(meals[randomIndex]);
  }, [scale, meals?.length]);


  return (
    <View style={styles.container}>
      <ReturnPage title='Generiraj nasumični obrok' />
      <View style={styles.generateSection}>
        <Button
          onPress={handlePress}
          style={globalStyles.orangeButton}
          disabled={isLoading || !meals?.length}
        >
          <Text style={globalStyles.whiteText}>Generiraj</Text>
        </Button>

        <View style={styles.imageContainer}>
          <ConfettiAnimation ref={confettiRef} />

          {randomMeal && (
            <Animated.View style={[styles.animatedImageContainer, { transform: [{ scale }] }]}>
              <MealItem meal={randomMeal} width={190} />
            </Animated.View>
          )}
        </View>
      </View>
    </View>
  );
};
export default GenerateMealScreen

const styles = StyleSheet.create({
  generateSection: {
    flex: 1,
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 40,
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
})