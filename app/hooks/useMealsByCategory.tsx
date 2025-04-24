import categoryServices from "../services/categoryServices";
import { useQuery } from "@tanstack/react-query";

const useMealsByCategory = (categoryId : number) => {
  return useQuery({
    queryKey: ['meals',categoryId],
    queryFn: () => categoryServices.getMealsByCategory(categoryId),
    enabled: !!categoryId
  });
}

export default useMealsByCategory;
