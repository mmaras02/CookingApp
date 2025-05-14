import { supabase } from "@/lib/supabase";
import { Ingredient, Meal, MealCreate } from "@/app/types";
import { standardizeName } from "../utils";

const createMeal = async(mealData: MealCreate) => {
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
    //dobivan listu ingredients 
    const standardizedIngredients = ingredients.map((ing) => ({
        ...ing,
        name: standardizeName(ing.name),
    }));

    const { data: existingIngredients, error: findError } = await supabase
        .from('ingredients')
        .select('id, name')
        .in('name', standardizedIngredients.map(ing => ing.name));

    if (findError) throw findError;

    const existingNames = existingIngredients?.map(ing => ing.name) || [];
    const newIngredients = standardizedIngredients.filter(
        ing => !existingNames.includes(ing.name)
    );

    let allIngredients = existingIngredients || [];

    if (newIngredients.length > 0) {
        const { data: createdIngredients, error: createError } = await supabase
            .from('ingredients')
            .insert(newIngredients.map(ing => ({ name: ing.name })))
            .select();

        if (createError) throw createError;
        allIngredients = [...existingIngredients, ...createdIngredients];
    }

    const ingredientsdWithQuantity = allIngredients.map(dbIng => {
        const original = standardizedIngredients.find(ing => ing.name === dbIng.name);
        return {
            ...dbIng,
            quantity: original?.quantity ?? '',
        };
    });

    console.log("Ingwqq", allIngredients);

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