import { useEffect, useState } from "react";
import { Meal } from "../types/Meal";
import categoryServices from "../services/categoryServices";

const useCategoryMelas = (categoryId : number) => {
    const [meals, setMeals] = useState<Meal[] | null>([]); 
    const [error, setError] = useState(""); 
  
    useEffect(() => {
      const fetchMeals = async () => {
        try {
          const response = await categoryServices.getMealsByCategory(categoryId);
          setMeals(response);
        } catch (error) {
          console.error("Error fetching meals:", error);
          setError("Error fetching");
        }
      };
  
      fetchMeals();
    }, [categoryId]);

    return { meals, error};
}

export default useCategoryMelas;
