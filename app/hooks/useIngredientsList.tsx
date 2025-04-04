import { useEffect, useState } from "react";
import ingredientServices from "../services/ingredientServices";
import { Ingredient } from "../types/Meal";

const useIngredientsList = () => {
    const [ ingredients , setIngredients] = useState<Ingredient[]>();
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchIngredients = async () => {
          try {
            const response = await ingredientServices.getIngredients();
            setIngredients(response);

          }catch (error) {
            setError("Error fetching categories");
          }
        };
    
        fetchIngredients();
      }, []);

    return { ingredients, error };
}

export default useIngredientsList;