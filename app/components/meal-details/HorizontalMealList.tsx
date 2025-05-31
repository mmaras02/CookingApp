import { Meal, RootParamList } from '@/app/types';
import { FlatList } from 'react-native';
import { MealItem, TitleHeader } from '..';
import { useNavigation } from 'expo-router';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const HorizontalMealList = ({ meals, title }: { meals: Meal[], title: string }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootParamList>>();

  if (!meals) return null;
  return (
    <>
      <TitleHeader titleText={title}
        onPress={() => navigation.navigate('DisplayMeals', { meals: meals })} />

      <FlatList data={meals.slice(0, 8)}
        keyExtractor={(meal) => meal.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <MealItem meal={item} />
        )} />
    </>
  )
}

export default HorizontalMealList;