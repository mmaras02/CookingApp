import { mealServices } from "@/app/services";
import { useQuery } from "@tanstack/react-query";

export const useMeals = () => {
  return useQuery({
    queryKey: ['meals'],
    queryFn: () => mealServices.getMeals(),
  });

}