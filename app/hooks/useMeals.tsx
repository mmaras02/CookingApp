import { useEffect, useState } from "react";
import { Meal } from "../types/Meal";
import mealServices from "../services/mealServices";

const useCategories = () => {
    const [meals, setMeals] = useState<Meal[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMeals = async () => {
          try {
            const response = await mealServices.getMeals();
            setMeals(response);

          }catch (error) {
            setError("Error fetching categories");
          }
        };
    
        fetchMeals();
      }, []);

    return { meals, error };
}

export default useCategories;