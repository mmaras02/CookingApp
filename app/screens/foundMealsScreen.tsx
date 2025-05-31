import { View, Text, StyleSheet, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootParamList } from '@/app/types';
import ReturnPage from '../navigation/returnPage';
import { globalStyles, COLORS } from '@/styles';
import { S, VS } from '../utils';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MealList } from '@/app/components';

const FoundMealsScreen = () => {
    const route = useRoute<RouteProp<RootParamList, 'Found'>>();
    const navigation = useNavigation<NativeStackNavigationProp<RootParamList>>();
    const { meals } = route.params;

    if (!meals || meals.length === 0) {
        return (
            <View>
                <ReturnPage />
                <Text style={globalStyles.titleText}>Nema pronađenih recepata</Text>
                <Text style={globalStyles.text}>Pokušaj s drugim sastojcima</Text>
            </View>
        );
    }
    const firstMeal = meals[0];
    const remainingMeals = meals.slice(1);

    return (
        <ScrollView>
            <ReturnPage title='Pronađeni recepti' />
            <View style={styles.container}>
                <Text style={globalStyles.headingText}>Najbolji rezultat:</Text>
                <TouchableOpacity style={styles.firstMealContainer}
                    onPress={() => navigation.navigate('MealDetails', { mealId: firstMeal.id })}>
                    <ImageBackground
                        source={{ uri: firstMeal.image_url! }}
                        style={styles.firstMealImage}
                        resizeMode="cover"
                    >
                        <Text style={styles.titleText}>{firstMeal.name}</Text>
                    </ImageBackground>
                </TouchableOpacity>

                {remainingMeals.length > 0 && (
                    <>
                        <Text style={globalStyles.headingText}> Pronašli smo još recepata koji odgovaraju tvojim sastojcima:</Text>
                        <View>
                            {remainingMeals.map((item) => (
                                <View key={item.id || Math.random()}>
                                    <MealList meal={item} />
                                </View>
                            ))}
                        </View>
                    </>
                )}

            </View>
        </ScrollView>
    )
}

export default FoundMealsScreen

const styles = StyleSheet.create({
    container: {
        marginBottom: VS(50),
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
    titleText: {
        backgroundColor: COLORS.secondaryTransparent,
        fontSize: 30,
        fontWeight: 600,
        color: COLORS.textSecondary,
        maxWidth: '100%',
        textAlign: 'center',
        padding: 10,
    },
})