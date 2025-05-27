import { View, Text, StyleSheet, ImageBackground, ScrollView } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootParamList } from '@/app/types';
import ReturnPage from '../navigation/returnPage';
import { globalStyles, COLORS } from '@/styles';
import MealList from '../components/meal-details/MealList';

const FoundMealsScreen = () => {
    const route = useRoute<RouteProp<RootParamList, 'Found'>>();
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
            <ReturnPage title='Pronađeni recepti' />
            <View style={styles.container}>
                <Text style={globalStyles.headingText}>Najbolje se slaže:</Text>
                <View style={styles.firstMealContainer}>
                    <ImageBackground
                        source={{ uri: firstMeal.image_url! }}
                        style={styles.firstMealImage}
                        resizeMode="cover">
                        <Text style={styles.TitleText}>{firstMeal.name}</Text>
                    </ImageBackground>
                </View>

                <Text style={globalStyles.TitleText}> I drugi recepti koji sadrže odgovarajuće sastojke</Text>
                <View>
                    {remainingMeals.map((item) => (
                        <View key={item.id || Math.random()}>
                            <MealList meal={item} />
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
        marginHorizontal: 10,
    },
    firstMealContainer: {
        marginBottom: 30,
        margin: 5,
        borderRadius: 20,
        overflow: 'hidden',

    },
    firstMealImage: {
        height: 300,
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
})