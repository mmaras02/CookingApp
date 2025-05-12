import { supabase } from "@/lib/supabase";
import { Review } from "@/app/types";

const getReviewsForMeal = async(mealId: number) => {
    const {data, error} = await supabase
        .from('reviews')
        .select('*, profiles(username, profile_img)')
        .eq('meal_id', mealId)
        .order('created_at', { ascending: false });;

    if(error) throw error;
    return data;
}

const writeReview = async(review: Review) => {
    const {data, error} = await supabase
        .from('reviews')
        .insert(review)
        .select();
    
    if(error) throw error;
    return data;
}
export default { getReviewsForMeal, writeReview };