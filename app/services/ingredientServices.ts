import { supabase } from "@/lib/supabase";

const getIngredients = async () => {
        const { data, error } = await supabase.from("ingredients").select("*");

        if (error) {
                throw new Error("Error fetching meals");
        }
        return data;
};

const getIngredientsByMealId = async (mealId: number) => {
        const { data, error } = await supabase
                .from("meal_ingredients")
                .select(
                        `quantity, ingredients:ingredient_id (id, name, image_url)`
                )
                .eq("meal_id", mealId)
                .throwOnError();

        if (error) {
                throw new Error(
                        `Error fetching ingredients for meal with id ${mealId}`
                );
        }
        const ingredients = data.flatMap((item) => ({
                quantity: item.quantity,
                ...item.ingredients,
        }));

        return ingredients;
};

const getMealsByIngredients = async (IngredientIds: number[]) => {
        const { data: matchingMeals, error: matchError } = await supabase
                .from("meal_ingredients")
                .select("meal_id")
                .in("ingredient_id", IngredientIds);

        if (matchError) throw matchError;
        if (!matchingMeals || matchingMeals.length === 0) return [];

        // unique meal ids
        const uniqueMealIds = [
                ...new Set(matchingMeals.map((item) => item.meal_id)),
        ];

        const { data: allMealIngredients, error: ingredientsError } =
                await supabase
                        .from("meal_ingredients")
                        .select("meal_id, ingredient_id")
                        .in("meal_id", uniqueMealIds);

        if (ingredientsError) throw ingredientsError;
        if (!allMealIngredients) return [];

        //track numbers
        const mealStats = new Map<
                number,
                { matchedCount: number; totalCount: number }
        >();
        uniqueMealIds.forEach((mealId) => {
                mealStats.set(mealId, { matchedCount: 0, totalCount: 0 });
        });

        allMealIngredients.forEach(({ meal_id, ingredient_id }) => {
                const stats = mealStats.get(meal_id);
                if (!stats) return;

                stats.totalCount += 1;
                if (IngredientIds.includes(ingredient_id)) {
                        stats.matchedCount += 1;
                }
                mealStats.set(meal_id, stats);
        });

        const { data: mealsData, error: mealsError } = await supabase
                .from("meals")
                .select("*")
                .in("id", uniqueMealIds);

        if (mealsError) throw mealsError;
        if (!mealsData) return [];

        const result = mealsData.map((meal) => {
                const stats = mealStats.get(meal.id);
                return {
                        ...meal,
                        percentage_match: stats
                                ? (stats.matchedCount / stats.totalCount) * 100
                                : 0,
                };
        });

        result.sort(
                (a, b) => (b.percentage_match ?? 0) - (a.percentage_match ?? 0)
        );

        return result;
};

export default {
        getIngredients,
        getIngredientsByMealId,
        getMealsByIngredients,
};
