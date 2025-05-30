import ReturnPage from '../navigation/returnPage';
import LottieView from 'lottie-react-native';
import { View, StyleSheet, Animated } from 'react-native'
import { useEffect, useRef, useState } from 'react';
import { CategorySelector, ConfettiAnimation, CustomButton, MealItem } from '@/app/components';
import { Meal } from '@/app/types';
import { useMeals, useMealsByCategories } from '../hooks';
import images from '@/assets/images';
import { getDayOfWeek, S } from '../utils';

const GenerateMealScreen = () => {
  const [randomMeal, setRandomMeal] = useState<Meal | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const { data: meals } = useMeals();
  const { data: categoryMeals } = useMealsByCategories(selectedCategories);

  const [scale] = useState(new Animated.Value(1.2));
  const confettiRef = useRef<LottieView>(null);
  const [fadeAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    if (getDayOfWeek() === 5) {
      setSelectedCategories([5]);
    }
  }, []);

  const handlePress = () => {
    const filteredMeals = selectedCategories.length === 0 ? meals : categoryMeals;
    if (!filteredMeals || filteredMeals?.length === 0) return;

    if (confettiRef.current) confettiRef.current.play(0);

    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 400,
      useNativeDriver: true,
    }).start(() => {
      const randomIndex = Math.floor(Math.random() * filteredMeals.length);
      setRandomMeal(filteredMeals[randomIndex]);

      Animated.sequence([
        Animated.spring(scale, { toValue: 1.4, friction: 3, useNativeDriver: true }),
        Animated.spring(scale, { toValue: 1.2, friction: 3, useNativeDriver: true }),
      ]).start();
    });

  };

  return (
    <View style={styles.container}>
      <ReturnPage title='Generiraj nasumični obrok' />
      <View style={styles.generateSection}>

        <View style={{ width: '100%', zIndex: 1200 }}>
          <CategorySelector selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories} />
        </View>

        <View style={styles.imageContainer}>
          <ConfettiAnimation ref={confettiRef} />

          {randomMeal ? (
            <Animated.View style={[styles.animatedImageContainer, { transform: [{ scale }] }]}>
              <MealItem meal={randomMeal} width={190} />
            </Animated.View>
          ) : (
            <Animated.Image source={images.QuestionMark}
              style={[styles.questionMark, { opacity: fadeAnim }]}
              resizeMode="contain" />
          )}

        </View>

        <CustomButton onPress={handlePress}
          buttonText='Generiraj obrok' />

      </View>
    </View>
  );
};
export default GenerateMealScreen

const styles = StyleSheet.create({
  generateSection: {
    flex: 1,
    alignItems: 'center',
    margin: S(15),
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
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
  questionMark: {
    width: S(300),
    height: S(300),
    position: 'absolute',
  },
})