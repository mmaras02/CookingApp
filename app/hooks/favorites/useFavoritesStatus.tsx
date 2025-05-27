import { favoriteServices } from "@/app/services";
import { useAuth } from "../../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { useFavoriteActions } from "./useFavorites";

export const useFavoriteStatus = (mealId: number) => {
  const { user } = useAuth();

  const { data: isFavorited, isLoading } = useQuery({
    queryKey: ['favoriteStatus', user?.profile?.id, mealId],
    queryFn: () => favoriteServices.checkIfFavorite(user?.profile.id!, mealId),
    enabled: !!user?.profile?.id && !!mealId
  });

  const { toggleFavorite } = useFavoriteActions();

  const handleToggleFavorite = async () => {
    if (!user || isLoading) return;
    await toggleFavorite.mutateAsync({
      mealId,
      isFavorited: !!isFavorited
    });
  };

  return {
    isFavorited: !!isFavorited,
    toggleFavorite: handleToggleFavorite,
    isLoading
  };
};