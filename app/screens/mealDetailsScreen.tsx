import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { ParamsList } from "../types/ParamsList";
import { useEffect, useState } from "react";
import mealServices from "../services/mealServices";
import { Ingredient, Recipe, Meal } from "../types/Meal";
import globalStyles from "@/styles/global";
import IngredientsList from "../components/mealDetails/ingredientsList";
import InstructionsList from "../components/mealDetails/instructionsList";

const MealDetailsScreen = () => {
    const route = useRoute<RouteProp<ParamsList, 'MealDetails'>>();
    const navigation = useNavigation();
    const { mealId: mealId } = route.params;

    const [meal, setMeal] = useState<Meal | null>(null);
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [recipe, setRecipe] = useState<Recipe[]>([]);

    useEffect(() => {
        const fetchMeal = async () => {
            try {
                const response = await mealServices.getMealById(mealId);
                setMeal(response);

                const fechedIngredients = await mealServices.getIngredientsByMealId(mealId);
                setIngredients(fechedIngredients);

                const fechedRecipe = await mealServices.getRecipeByMealId(mealId);
                setRecipe(fechedRecipe);

            }catch (error) {
                console.error('Error fetching meal:', error);
            }
        };
    
        fetchMeal();
    }, [mealId]);

    if (!meal) {
        return <Text>Meal not found</Text>;
    }

    return (
        <ScrollView>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Text>❮</Text>
            </TouchableOpacity>
            
            <Image source={{ uri: meal.image_url }} style={styles.header} />
            
            <View style={styles.title}> 
                <Text style={globalStyles.TitleText}>{meal.name}</Text>
            </View>
            
            <IngredientsList ingredients={ingredients} />
            <InstructionsList recipe={recipe} />
       
        </ScrollView>
    );
}

export default MealDetailsScreen;

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 350,
    },
    title: {
        height: 80,
        justifyContent: 'center',
        margin: 10,
      },
    backButton: {
        position: 'absolute',
        left: 10,
        margin: 10,
        padding: 10,
        alignItems: 'center',
        zIndex: 10,
        backgroundColor: '#f6f6f6',
        borderRadius: 10,
    },

})

/**tite odvojit u global vj */