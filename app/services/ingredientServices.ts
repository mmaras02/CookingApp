import { supabase } from "@/lib/supabase";
import { mealServices } from ".";

const getIngredients = async () => {
  const { data, error } = await supabase
    .from('ingredients')
    .select("*");

  if (error) {
    throw new Error("Error fetching meals");
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


const getMealsByIngredients = async (IngredientsIds: number[]) => {
  const {data, error} = await supabase
    .from('meal_ingredients')
    .select('meal_id')
    .in('ingredient_id', IngredientsIds);

    const counter = new Map<number, number>();

    data?.forEach(item => {
      counter.set(item.meal_id, (counter.get(item.meal_id) || 0) + 1);
    });

    const sortedMeals = [...counter.entries()]
      .sort((a, b) => b[1] - a[1]) 
      .map(([meal_id]) => meal_id);

    const meals = await mealServices.getMealsByIds(sortedMeals);
    const mealsMap = Object.fromEntries(meals.map(meal => [meal.id, meal]));
    return sortedMeals.map(id => mealsMap[id]).filter(Boolean);
    //console.log("meals", meals);
    //return meals;
}

export default {getIngredients, getIngredientsByMealId, getMealsByIngredients };