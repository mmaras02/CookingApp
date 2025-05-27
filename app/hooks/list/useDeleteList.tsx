import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useAuth } from "../../context/AuthContext";
import { listsServices } from "@/app/services";

export const useDeleteList = () => {
    const queryClient = useQueryClient();
    const { user } = useAuth();
    const userId = user?.user?.id;

    const { mutateAsync: deleteList } = useMutation({
        mutationFn: (listId: number) => listsServices.deleteList(listId),

        onMutate: async (listId) => {
            const previousLists = queryClient.getQueryData(['lists', userId]);

            queryClient.setQueryData(['lists', userId], (old: any[] = []) =>
                old.filter(list => list.id !== listId)
            );
            return { previousLists };
        },

        onError: (err, variables, context) => {
            if (context?.previousLists) {
                queryClient.setQueryData(['lists'], context.previousLists);
            }
        },
    });

    return { deleteList }
}