import { categoryServices, ingredientServices, mealServices, recipeServices } from "@/app/services";
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