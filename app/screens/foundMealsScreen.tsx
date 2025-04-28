import { View, Text, StyleSheet, ImageBackground, ScrollView } from 'react-native'
import React from 'react'
import { RouteProp, useRoute } from '@react-navigation/native';
import { ParamsList } from '../types/ParamsList';
import ReturnPage from '../navigation/returnPage';
import globalStyles from '@/styles/global';
import COLORS from '@/styles/colors';
import { MealItem } from '../components/index';

const FoundMealsScreen = () => {
    const route = useRoute<RouteProp<ParamsList, 'Found'>>();
    const { meals } = route.params;

    if (!meals || meals.length === 0) {
        return (
            <View>
                <ReturnPage />
                <Text style={globalStyles.TitleText}>No meals found</Text>
                <Text style={globalStyles.text}>Please try different ingredients</Text>
            </View>
        );
    }
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

            <Text style={globalStyles.TitleText}> I drugi recepti koji sadrže odgovarajuće sastojke</Text>
            <View style={styles.mealsGrid}>
                {remainingMeals.map((item) => (
                    <View key={item.id || Math.random()}>
                        <MealItem meal={item} />
                    </View>
                ))}
            </View>
        </View>
    </ScrollView>
  )
}

export default FoundMealsScreen

const styles = StyleSheet.create({
    container: {
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
        backgroundColor: COLORS.transparent_orange,
        fontSize: 30,
        fontWeight: 600,
        color: COLORS.light,
        maxWidth: '100%',
        textAlign: 'center',
        padding: 10, 
    },
    mealsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    }
})