import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { ReturnPage } from '@/app/navigation';
import { RootParamList } from '@/app/types';
import { globalStyles } from '@/styles';
import { VS } from '@/app/utils';
import { MealCard, MealList } from '@/app/components';

const FoundMealsScreen = () => {
    const route = useRoute<RouteProp<RootParamList, 'Found'>>();
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
                <MealCard meal={firstMeal} isFoundMeal />

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
})