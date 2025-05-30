// services/favoriteServices.ts
import { supabase } from "@/lib/supabase";
import { Meal } from "@/app/types";

const checkIfFavorite = async (
        userId: string,
        mealId: number
): Promise<boolean> => {
        const { data, error } = await supabase
                .from("user_favorites")
                .select("*")
                .eq("user_id", userId)
                .eq("meal_id", mealId)
                .maybeSingle();

        if (error) {
                console.error("Supabase error:", error);
                throw error;
        }

        return !!data;
};

const toggleFavoriteMeal = async (
        userId: string,
        mealId: number,
        isFavorite: boolean
) => {
        if (isFavorite) {
                const { error } = await supabase
                        .from("user_favorites")
                        .delete()
                        .match({
                                user_id: userId,
                                meal_id: mealId,
                        });

                if (error) throw error;
        } else {
                const { error } = await supabase
                        .from("user_favorites")
                        .insert({
                                user_id: userId,
                                meal_id: mealId,
                        })
                        .select()
                        .single();

                if (error) throw error;
        }

        return !isFavorite;
};

const getUserFavorites = async (userId: string) => {
        const { data: favoriteIds, error: idError } = await supabase
                .from("user_favorites")
                .select("meal_id")
                .eq("user_id", userId);

        if (idError) throw idError;

        if (!favoriteIds?.length) return [];

        const { data: meals, error } = await supabase
                .from("meals")
                .select("*")
                .in(
                        "id",
                        favoriteIds.map((fav) => fav.meal_id)
                );

        if (error) throw error;

        return meals as Meal[];
};

export default { checkIfFavorite, toggleFavoriteMeal, getUserFavorites };
