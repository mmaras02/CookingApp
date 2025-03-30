import { supabase } from "@/lib/supabase";

const getIngredientsByMealId = async (mealId: number) => {
  const { data, error } = await supabase
   .from('meal_ingredients')
   .select(`quantity, ingredients:ingredient_id (id, name, image_url)`)
   .eq('meal_id', mealId)
   .throwOnError();

  if (error) {
    throw new Error(`Error fetching ingredients for meal with id ${mealId}`);
  }
  const ingredients = data.flatMap((item) => ({
    quantity: item.quantity,
    ...item.ingredients,
  }));

  return ingredients;
};

export default { getIngredientsByMealId };