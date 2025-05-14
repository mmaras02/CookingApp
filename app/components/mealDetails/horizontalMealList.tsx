import { Meal, RootParamList } from '@/app/types';
import React from 'react'
import { FlatList, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MealItem } from '..';
import { COLORS, globalStyles } from '@/styles';
import MealList from './mealList';
import { useNavigation } from 'expo-router';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const HorizontalMealList = ({meals, title} : {meals: Meal[], title: string}) => {
    const navigation = useNavigation<NativeStackNavigationProp<RootParamList>>();
  
    if (!meals) return null;
    return (
        <>
        <View style={styles.container}>
            <Text style={globalStyles.TitleText}>{title}</Text>
            <TouchableOpacity onPress={() => navigation.navigate('DisplayMeals' , {meals: meals})}>
                <Text style={styles.moreText}>Vidi više</Text>
            </TouchableOpacity>
        </View>
        <FlatList data={meals.slice(0,8)}
                  keyExtractor={(meal) => meal.id.toString()}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item }) => (
                    <MealItem meal={item} />
                  )} />
        </>
    )
}

export  default HorizontalMealList;

const styles = StyleSheet.create({
    container: {
      marginBottom: 5,
      marginLeft:15,
      marginTop: 30,
      justifyContent: 'space-between',
      flexDirection: 'row'
    },
    moreText: {
      fontSize: 16,
      color: COLORS.orange,
      fontWeight: 700,
      marginRight: 10,
      marginTop: 10,
  }

})