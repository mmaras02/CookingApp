import { ScrollView, View } from 'react-native'
import React from 'react'
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootParamList } from '../types';
import ReturnPage from '../navigation/returnPage';
import MealList from '../components/mealDetails/mealList';

const DisplayMealsScreen = () => {
  const route = useRoute<RouteProp<RootParamList, 'DisplayMeals'>>();
  const { meals } = route.params;

  return (
    <ScrollView>
      <ReturnPage title='Svi recepti' />
      {meals && meals.map((meal,index) => (
        <View key={index}>
          <MealList meal={meal} />
        </View>
      ))}
    </ScrollView>
  )
}

export default DisplayMealsScreen;