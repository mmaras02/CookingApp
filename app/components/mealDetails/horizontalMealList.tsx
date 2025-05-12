import { Meal } from '@/app/types';
import React from 'react'
import { FlatList, View, Text, StyleSheet } from 'react-native';
import { MealItem } from '..';
import { globalStyles } from '@/styles';

const HorizontalMealList = ({meals, title} : {meals: Meal[], title: string}) => {
    if (!meals) return null;
    return (
        <>
        <View style={styles.container}>
            <Text style={globalStyles.TitleText}>{title}</Text>
        </View>
        <FlatList data={meals}
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
    },

})