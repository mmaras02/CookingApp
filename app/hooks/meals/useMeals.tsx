import { mealServices } from "@/app/services";
import { Meal } from "@/app/types";
import { useQuery } from "@tanstack/react-query";

export const useMeals = () => {
  return useQuery<Meal[]>({
    queryKey: ['meals'],
    queryFn: () => mealServices.getMeals(),
  });

}