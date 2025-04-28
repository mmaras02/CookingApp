import listsServices from "../services/listsServices";
import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ListItem } from "../types/ListParams";

export const useListItems = (listId: number) => {
  return useQuery({
    queryKey: ['listItems', listId],
    queryFn: () => listsServices.getListItems(listId),
    enabled: !!listId,
  });

}

export const useCreateListItems = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (item: ListItem) => listsServices.insertListItems([item]),
    onMutate: async (newItem) => {
      await queryClient.cancelQueries({ queryKey: ['listItems', newItem.list_id] });
      const previousItems = queryClient.getQueryData<ListItem[]>(['listItems', newItem.list_id]);
      
      queryClient.setQueryData<ListItem[]>(['listItems', newItem.list_id], (old) => [
        ...(old || []),
        {
          ...newItem,
          id: Math.random(),
          created_at: new Date().toISOString()
        }
      ]);
      
      return { previousItems };
    },

    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
      queryKey: ['listItems', variables.list_id],
      });
    },
    onError: (error) => {
      console.error("Error creating list item:", error);
    }
  });
}

export const useUpdateCheckbox = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, is_checked }: { id: number; is_checked: boolean }) => 
      listsServices.updateListItemChecked(id, is_checked),
    onMutate: async (updatedItem) => {
      await queryClient.cancelQueries({ queryKey: ['listItems'] });
      const previousItems = queryClient.getQueryData<ListItem[]>(['listItems']);
      
      queryClient.setQueryData(['listItems'], (old: ListItem[] | undefined) =>
        old?.map(item =>
          item.id === updatedItem.id
            ? { ...item, is_checked: updatedItem.is_checked }
            : item
        )
      );
      
      return { previousItems };
    },
    onError: (err, updatedItem, context) => {
      queryClient.setQueryData(['listItems'], context?.previousItems);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['listItems'] });
    }
  });
};