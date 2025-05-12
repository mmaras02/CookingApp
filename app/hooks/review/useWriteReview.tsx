import { useAuth } from '@/app/context/userSessionContext';
import { reviewServices } from '@/app/services';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface ReviewData {
  mealId: number;
  rating: number;
  comment: string;
}

export const useWriteReview = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const userId = user?.profile?.id;

  return useMutation({
    mutationFn: ({ mealId, rating, comment }: ReviewData) => {
      
      return reviewServices.writeReview({
        user_id: userId!,
        meal_id: mealId,
        rating,
        comment
      });
    },
    onMutate: async ({ mealId, rating, comment }: ReviewData) => {
      await queryClient.cancelQueries({ queryKey: ['reviews', mealId] });

      const previousReviews = queryClient.getQueryData(['reviews', mealId]);

      queryClient.setQueryData(['reviews', mealId], (old: any) => {
        const newReview = {
          id: Date.now(),
          rating,
          comment,
          user_id: userId,
          meal_id: mealId,
          profiles: {
            username: user?.profile?.username,
            profile_img: user?.profile?.profile_img
          }
        };
        return [...(old || []), newReview];
      });

      return { previousReviews };
    },
    onError: (err, variables, context) => {
      if (context?.previousReviews) {
        queryClient.setQueryData(['reviews', variables.mealId], context.previousReviews);
      }
      console.error('Error submitting review:', err);
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['reviews', variables.mealId] });
    },
  });

};