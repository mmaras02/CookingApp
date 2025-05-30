import { categoryServices } from "@/app/services";
import { Meal } from "@/app/types";
import { useQuery } from "@tanstack/react-query";

export const useMealsByCategories = (categoryIds: number[]) => {
  return useQuery<Meal[]>({
    queryKey: ['mealsByCategories', categoryIds],
    queryFn: () => categoryServices.getMealsByCategories(categoryIds),
    enabled: categoryIds.length > 0
  });
}
