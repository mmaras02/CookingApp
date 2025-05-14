import { reviewServices } from "@/app/services";
import { Review } from "@/app/types";
import { useQuery } from "@tanstack/react-query";

export const useMealReviews = (mealId: number) => {
  return useQuery<Review[]>({
    queryKey: ['reviews', mealId],
    queryFn: () => reviewServices.getReviewsForMeal(mealId),
    enabled: !!mealId,
  });

}