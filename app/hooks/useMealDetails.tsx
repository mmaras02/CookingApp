import mealServices from "../services/mealServices";
import ingredientServices from "../services/ingredientServices";
import recipeServices from "../services/recipeServices";
import categoryServices from "../services/categoryServices";
import { useQuery } from "@tanstack/react-query";

export const useMealDetails = (mealId: number) => {
    return useQuery({
        queryKey: ['mealDetails', mealId],
        queryFn: async () => {
            const [meal, ingredients, recipe, category] = await Promise.all([
                mealServices.getMealById(mealId),
                ingredientServices.getIngredientsByMealId(mealId),
                recipeServices.getRecipeByMealId(mealId),
                categoryServices.getCategoryByMealId(mealId)
            ]);
            return { meal, ingredients, recipe, category };
        },
        enabled: !!mealId
    });
}