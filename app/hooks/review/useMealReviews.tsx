import { reviewServices } from "@/app/services";
import { useQuery } from "@tanstack/react-query";

export const useMealReviews = (mealId: number) => {
  return useQuery({
    queryKey: ['reviews', mealId],
    queryFn: () => reviewServices.getReviewsForMeal(mealId),
    enabled: !!mealId,
  });

}