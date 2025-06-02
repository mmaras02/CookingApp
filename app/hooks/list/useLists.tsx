import { useAuth } from "@/app/context/AuthContext";
import { listsServices } from "@/app/services";
import { List } from "@/app/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useLists = () => {
    const queryClient = useQueryClient();
    const { user } = useAuth();
    const userId = user?.profile?.id;

    const { data: lists, isLoading, error } = useQuery<List[]>({
        queryKey: ['lists', userId],
        queryFn: () => listsServices.getLists(userId!),
    });

    const { mutateAsync: createList } = useMutation({
        mutationFn: (title: string) => listsServices.createList(userId!, title),

        onMutate: async (newTitle) => {
            await queryClient.cancelQueries({ queryKey: ['lists', userId] });
            const previousLists = queryClient.getQueryData(['lists', userId]);

            queryClient.setQueryData(['lists', userId], (old: any[] = []) => [
                ...old,
                {
                    id: Date.now().toString(),
                    title: newTitle,
                }
            ]);

            return { previousLists };
        },

        onSuccess: (newList) => {
            queryClient.setQueryData(['lists', userId], (old: any[] = []) => [...old, newList]);
        },

        onError: (err, variables, context) => {
            if (context?.previousLists) {
                queryClient.setQueryData(['lists', userId], context.previousLists);
            }
        },
    });

    return {
        lists,
        isLoading,
        error,
        createList
    }
}