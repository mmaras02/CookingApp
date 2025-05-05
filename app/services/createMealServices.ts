import { supabase } from "@/lib/supabase";
import { Ingredient, Meal } from "../types";

const createMeal = async(mealData: Meal) => {
    const { data, error } = await supabase
        .from('meals')
        .insert(mealData)
        .select()
        .single()
    
    if(error) throw error;
    return data;
}

const addMealCategories = async(mealId: number, categoryIds: string[]) => {
    const categoriesToAdd = categoryIds.map(category_id => ({
        meal_id: mealId,
        category_id,
    }))

    const { error } = await supabase
        .from('meal_category')
        .insert(categoriesToAdd);

    if (error) throw error;
}

const findOrAddIngredients = async(ingredients: Ingredient[]) => {
    const { data: existingIngredients, error: findError } = await supabase
        .from('ingredients')
        .select('id, name')
        .in('name', ingredients.map(i => i.name));

    if (findError) throw findError;

    const existingNames = existingIngredients?.map(i => i.name) || [];
    const newIngredients = ingredients.filter(
        i => !existingNames.includes(i.name)
    );

    let allIngredients = existingIngredients || [];

    if (newIngredients.length > 0) {
        const { data: createdIngredients, error: createError } = await supabase
            .from('ingredients')
            .insert(newIngredients.map(i => ({ name: i.name })))
            .select();

        if (createError) throw createError;
        allIngredients = [...existingIngredients, ...createdIngredients];
    }

    const ingredientsdWithQuantity = allIngredients.map(dbIng => {
        const original = ingredients.find(i => i.name === dbIng.name);
        return {
            ...dbIng,
            quantity: original?.quantity ?? '',
        };
    });

    return ingredientsdWithQuantity;
}

const addMealIngredients = async ( mealId: string, ingredients: Ingredient[]) => {
    const mealIngredients = ingredients.map(ingredient => ({
      meal_id: mealId,
      ingredient_id: ingredient.id,
      quantity: ingredient.quantity
    }));
  
    const { error } = await supabase
      .from('meal_ingredients')
      .insert(mealIngredients);
  
    if (error) throw error;
};

const addMealSteps = async ( mealId: string, steps: string[]) => {
    console.log("enter", steps)
    const stepRecords = steps.map((instruction, index) => ({
      meal_id: mealId,
      step_number: index + 1,
      instructions: instruction
    }));
    console.log("enter1", stepRecords)
  
    const { error } = await supabase
      .from('recipes')
      .insert(stepRecords);
  
    if (error) throw error;
};

export default { createMeal, addMealCategories, findOrAddIngredients, addMealIngredients, addMealSteps };