import { userServices } from "@/app/services";
import { useQuery } from "@tanstack/react-query";

export const useUser = (userId: string) => {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => userServices.getUserById(userId),
    enabled: !!userId,
  });

}