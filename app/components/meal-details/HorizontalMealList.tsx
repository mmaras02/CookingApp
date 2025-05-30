import { Meal, RootParamList } from '@/app/types';
import React from 'react'
import { FlatList, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MealItem, TitleHeader } from '..';
import { COLORS, globalStyles } from '@/styles';
import { useNavigation } from 'expo-router';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { S } from '@/app/utils';

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

const styles = StyleSheet.create({
  container: {
    marginLeft: S(15),
    marginTop: S(20),
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  moreText: {
    fontSize: S(14),
    color: COLORS.orange,
    fontWeight: 700,
    marginRight: S(10),
    marginTop: S(10),
  }

})