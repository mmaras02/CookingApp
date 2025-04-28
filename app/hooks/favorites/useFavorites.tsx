import { useUser } from '@/app/context/userSessionContext';
import { favoriteServices } from '@/app/services';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export const useFavorites = () => {
  const { user } = useUser();
  return useQuery({
    queryKey: ['favorites', user?.user?.id],
    queryFn: () => favoriteServices.getUserFavorites(user?.user.id),
    enabled: !!user?.user?.id
  });
};

export const useFavoriteActions = () => {
  const queryClient = useQueryClient();
  const { user } = useUser();
  const userId = user?.user?.id;

  const toggleFavorite = useMutation({
    mutationFn: ({ mealId, isFavorited }: { mealId: number; isFavorited: boolean }) =>
      favoriteServices.toggleFavoriteMeal(userId, mealId, isFavorited),

    onMutate: async ({ mealId, isFavorited }) => {
      await queryClient.cancelQueries({queryKey: ['favorites']});
      await queryClient.cancelQueries({queryKey: ['favoriteStatus', userId, mealId]});

      const previousFavorites = queryClient.getQueryData(['favorites']);

      queryClient.setQueryData(['favorites'], (old: any) =>
        isFavorited
          ? old?.filter((meal: any) => meal.id !== mealId)
          : [...(old || []), { id: mealId }]
      );

      queryClient.setQueryData(['favoriteStatus', userId, mealId], !isFavorited);

      return { previousFavorites };
    },

    onError: (err, variables, context) => {
      if (context?.previousFavorites) {
        queryClient.setQueryData(['favorites'], context.previousFavorites);
      }
    },

    onSuccess: (_, { mealId }) => {
      queryClient.invalidateQueries({
        queryKey: ['favoriteStatus', userId, mealId]
      });
      queryClient.invalidateQueries({
        queryKey: ['favorites']
      });
    }
  });

  return { toggleFavorite };
};
