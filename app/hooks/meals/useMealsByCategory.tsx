import { categoryServices } from "@/app/services";
import { Meal } from "@/app/types";
import { useQuery } from "@tanstack/react-query";

export const useMealsByCategory = (categoryId : number) => {
  return useQuery<Meal[]>({
    queryKey: ['meals',categoryId],
    queryFn: () => categoryServices.getMealsByCategory(categoryId),
    enabled: !!categoryId
  });
}
