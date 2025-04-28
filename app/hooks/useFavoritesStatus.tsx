import favoriteServices from "../services/favoriteServices";
import { useUser } from "../context/userSessionContext";
import { useQuery } from "@tanstack/react-query";
import { useFavoriteActions } from "./useFavorites";

export const useFavoriteStatus = (mealId: number) => {
    const { user } = useUser();

    const { data: isFavorited, isLoading } = useQuery({
        queryKey: ['favoriteStatus', user?.user?.id, mealId],
        queryFn: () => favoriteServices.checkIfFavorite(user?.user.id, mealId),
        enabled: !!user?.user?.id && !!mealId
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