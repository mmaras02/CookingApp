import { supabase } from "@/lib/supabase";
import { mealServices } from ".";

const getCategories = async () => {
        const { data, error } = await supabase
                .from("categories")
                .select("id, name");

        if (error) {
                throw new Error("Error fetching meals");
        }
        return data;
};

const getMealsByCategories = async (categoryIds: number[]) => {
        if (categoryIds.length === 0) return [];

        const { data, error } = await supabase
                .from("meal_category")
                .select("meal_id")
                .in("category_id", categoryIds);

        if (error) {
                console.error("Supabase error:", error);
                throw new Error("Error fetching meal_category");
        }

        const mealIds = [...new Set(data.map((item) => item.meal_id))];
        if (mealIds.length === 0) return [];

        const meals = await mealServices.getMealsByIds(mealIds);
        return meals;
};

const getCategoryByMealId = async (mealId: number) => {
        const { data, error } = await supabase
                .from("meal_category")
                .select("categories(name)")
                .eq("meal_id", mealId)
                .throwOnError();

        if (error) {
                throw new Error(
                        `Error fetching category for meal with id ${mealId}`
                );
        }

        //const categoryNames = data.map((item) => item.categories.name);
        const categoryNames = data.map(
                (item) => (item.categories as unknown as { name: string }).name
        );
        return categoryNames;
};

export default {
        getCategories,
        getMealsByCategories,
        getCategoryByMealId,
};
