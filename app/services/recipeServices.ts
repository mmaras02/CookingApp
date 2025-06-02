import { supabase } from "@/lib/supabase";

const getRecipeByMealId = async (mealId: number) => {
        const { data, error } = await supabase
                .from("recipes")
                .select("instructions, step_number")
                .eq("meal_id", mealId)
                .order("step_number", { ascending: true })
                .throwOnError();

        if (error)
                throw new Error(
                        `Error fetching recipe for meal with id ${mealId}`
                );
        return data;
};

export default { getRecipeByMealId };
