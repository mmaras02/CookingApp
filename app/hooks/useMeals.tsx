import mealServices from "../services/mealServices";
import { useQuery } from "@tanstack/react-query";

const useMeals = () => {
  return useQuery({
    queryKey: ['meals'],
    queryFn: () => mealServices.getMeals(),
  });

}

export default useMeals;