import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import listsServices from "../services/listsServices"
import { useUser } from "../context/userSessionContext";

export const useLists = () => {
    const queryClient = useQueryClient();
    const { user } = useUser();
    const userId = user?.user?.id;

    const { data: lists, isLoading, error } = useQuery({
        queryKey: ['lists', userId],
        queryFn: () => listsServices.getLists(userId),
    });

    const { mutate: createList }  = useMutation({
        mutationFn: (title: string) => listsServices.createList(userId, title),
        
        onMutate: async (newTitle) => {
            await queryClient.cancelQueries({queryKey: ['lists', userId]});
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
            queryClient.setQueryData(['lists'], (old: any[]) => [...(old || []), newList]);
        },

        onError: (err, variables, context) => {
            if (context?.previousLists) {
              queryClient.setQueryData(['lists'], context.previousLists);
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