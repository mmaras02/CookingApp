import { supabase } from "@/lib/supabase";
import mealServices from "./mealServices";

const getCategories = async () => {
    const { data, error } = await supabase
      .from('categories')
      .select("id, name");
  
    if (error) {
      throw new Error("Error fetching meals");
    }
    return data;
};

const getMealsByCategory = async (categoryId: number) => {
    const { data, error } = await supabase
        .from('meal_category')
        .select("meal_id")
        .eq("category_id", categoryId);
  
    if (error) {
    throw new Error("Error fetching meals");
    }

    const mealIds = data.map((mc) => mc.meal_id);
    const meals = await mealServices.getMealsByIds(mealIds);
    return meals;
  
}

const getCategoryByMealId = async (mealId: number) => {
  const { data, error } = await supabase
    .from('meal_category')
    .select('categories(name)')
    .eq('meal_id', mealId)
    .throwOnError();

 if (error) {
   throw new Error(`Error fetching category for meal with id ${mealId}`);
  }

 //const categoryNames = data.map((item) => item.categories.name);
 const categoryNames = data.map((item) => (item.categories as unknown as { name: string }).name);
 return categoryNames;
}

export default { getCategories, getMealsByCategory, getCategoryByMealId}