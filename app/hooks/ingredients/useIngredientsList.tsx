import { ingredientServices } from "@/app/services";
import { useQuery } from "@tanstack/react-query";

export const useIngredientsList = () => {
  return useQuery({
    queryKey: ['ingredients'],
    queryFn: () => ingredientServices.getIngredients(),
  })
}