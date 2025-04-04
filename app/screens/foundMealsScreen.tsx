import { View, Text, FlatList, StyleSheet, ImageBackground, ScrollView } from 'react-native'
import React from 'react'
import { RouteProp, useRoute } from '@react-navigation/native';
import { ParamsList } from '../types/ParamsList';
import MealItem from '../components/mealItem';
import ReturnPage from '../components/navigation/returnPage';
import globalStyles from '@/styles/global';
import COLORS from '@/styles/colors';

const FoundMealsScreen = () => {
    const route = useRoute<RouteProp<ParamsList, 'Found'>>();
    const { meals } = route.params;

    const firstMeal = meals[0];
    const remainingMeals = meals.slice(1);

  return (
    <ScrollView>
        <ReturnPage />
        <View style={styles.container}>
            <Text style={globalStyles.TitleText}>Recepti s odabranim sastojcima</Text>
            <Text style={globalStyles.text}>Najbolje se slaže:</Text>
            <View style={styles.firstMealContainer}>
                <ImageBackground
                    source={{ uri: firstMeal.image_url }}
                    style={styles.firstMealImage}
                    resizeMode="cover">
                    <Text style={styles.TitleText}>{firstMeal.name}</Text> 
                </ImageBackground>
            </View>

            <Text style={globalStyles.TitleText}>I drugi recepti koji sadrže odgovarajuće sastojke</Text>
            <FlatList 
                data={remainingMeals}
                keyExtractor={(item) => item.name || Math.random().toString()}
                numColumns={2}
                renderItem={({ item }) => (
                    <View>
                        <MealItem meal={item} />
                    </View>
                  )} />
        </View>
        
    </ScrollView>
  )
}

export default FoundMealsScreen

const styles = StyleSheet.create({
    container: {
        marginTop: 60,
        marginBottom: 130,
        margin: 'auto',
    },
    firstMealContainer: {
        marginBottom: 30,
        margin: 10,
        borderRadius: 20,
        overflow: 'hidden',
        
    },
    firstMealImage: {
        height: 350,
        justifyContent: 'center',
        alignItems: 'center',
    },
    TitleText: {
        backgroundColor: COLORS.transparent_green,
        fontSize: 30,
        fontWeight: 600,
        color: COLORS.light,
        maxWidth: '100%',
        textAlign: 'center',
        padding: 10, 
    },
})

/**
                    <Text style={styles.TitleText}>{firstMeal.name}</Text> */