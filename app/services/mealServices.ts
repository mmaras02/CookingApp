import { supabase } from "@/lib/supabase";

const getMeals = async () => {
  const { data, error } = await supabase
    .from('meals')
    .select("*");

  if (error) {
    throw new Error("Error fetching meals");
  }
  return data;
};

const getMealById = async (id : number) => {
  const { data, error } = await supabase
    .from('meals')
    .select()
    .eq('id', id)
    .single();

  if (error) {
    throw new Error("Error fetching meal by id");
  }
  return data;
}

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

const getRecipeByMealId = async (mealId: number) => {
  const { data, error } = await supabase
    .from('recipes')
    .select('instructions, step_number')
    .eq('meal_id', mealId)
    .order('step_number', { ascending: true })
    .throwOnError();

 if (error) {
   throw new Error(`Error fetching reciper for meal with id ${mealId}`);
 }

 return data;
}

export default { getMeals, getMealById, getIngredientsByMealId, getRecipeByMealId };
    