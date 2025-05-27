import { useAuth } from "@/app/context/AuthContext";
import { userServices } from "@/app/services";
import { UserProfile } from "@/app/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type UserProps = {
  userId: string,
  user: UserProfile,
}
export const useEditProfile = () => {
  const queryClient = useQueryClient();
  const { setUser } = useAuth();

  return useMutation({
    mutationFn: ({ userId, user }: UserProps) => {
      return userServices.editProfile(userId, user);
    },
    onMutate: async ({ userId, user }) => {
      await queryClient.cancelQueries({ queryKey: ['user', userId] });
      const previousInfo = queryClient.getQueryData(['user', userId]);

      setUser((prev) => ({
        ...prev!,
        profile: {
          ...prev!.profile,
          ...user,
        },
      }));

      return { previousInfo };
    },
    onError: (err, variables, context) => {
      if (context?.previousInfo) {
        queryClient.setQueryData(['user', variables.userId], context.previousInfo);
      }
      console.error('Error submitting review:', err);
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['user', variables.userId] });
    },
  });

}