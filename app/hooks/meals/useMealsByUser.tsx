import { mealServices } from "@/app/services";
import { Meal } from "@/app/types";
import { useQuery } from "@tanstack/react-query";

export const useMealsByUser = (userId : string) => {
  return useQuery<Meal[]>({
    queryKey: ['meals',userId],
    queryFn: () => mealServices.getMealsByUserId(userId),
    enabled: !!userId
  });
}
