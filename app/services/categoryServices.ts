import { supabase } from "@/lib/supabase";
import { mealServices } from ".";
import { Category } from "../types";

interface MealCategoryJoin {
        categories: {
                id: number;
                name: string;
        };
}

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

const getCategoryByMealId = async (mealId: number): Promise<Category[]> => {
        const { data, error } = await supabase
                .from("meal_category")
                .select<
                        "categories(id, name)",
                        MealCategoryJoin
                >("categories(id, name)")
                .eq("meal_id", mealId);

        if (error) {
                throw new Error(
                        `Error fetching category for meal with id ${mealId}`
                );
        }

        //const categoryNames = data.map((item) => item.categories.name);
        /*const categoryNames = data.map(
                (item) => (item.categories as unknown as { name: string }).name
        );
        return categoryNames;*/
        return data.map((item) => ({
                id: item.categories?.id,
                name: item.categories?.name,
        }));
};

export default {
        getCategories,
        getMealsByCategories,
        getCategoryByMealId,
};
