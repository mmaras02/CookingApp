import { useEffect, useState } from "react";
import { Ingredient, Meal, Recipe } from "../types/Meal";
import mealServices from "../services/mealServices";
import ingredientServices from "../services/ingredientServices";
import recipeServices from "../services/recipeServices";
import categoryServices from "../services/categoryServices";


const useMealDetails = (mealId: number) => {
    const [meal, setMeal] = useState<Meal | null>(null);
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [recipe, setRecipe] = useState<Recipe[]>([]);
    const [category, setCategory] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMeal = async () => {
            try {
                const response = await mealServices.getMealById(mealId);
                setMeal(response);

                const fechedIngredients = await ingredientServices.getIngredientsByMealId(mealId);
                setIngredients(fechedIngredients);

                const fechedRecipe = await recipeServices.getRecipeByMealId(mealId);
                setRecipe(fechedRecipe);

                const fechedCategory = await categoryServices.getCategoryByMealId(mealId);
                setCategory(fechedCategory);

            } catch (error) {
                console.error('Error fetching meal:', error);
                setError("Error fetching");
            }
        };
    
        fetchMeal();
    }, [mealId]);

    return { meal, ingredients, recipe, category, error};
}

export default useMealDetails;