import mealServices from "../services/mealServices";
import { useQuery } from "@tanstack/react-query";

export const useMeals = () => {
  return useQuery({
    queryKey: ['meals'],
    queryFn: () => mealServices.getMeals(),
  });

}