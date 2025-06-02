import { supabase } from "@/lib/supabase";
import { ListItem } from "@/app/types";

const getLists = async (userId: string) => {
        const { data, error } = await supabase
                .from("lists")
                .select("*")
                .eq("user_id", userId)
                .order("created_at", { ascending: false });

        if (error) throw error;
        return data;
};

const createList = async (userId: string, title: string) => {
        const { data, error } = await supabase
                .from("lists")
                .insert({ title, user_id: userId })
                .select()
                .single();

        if (error) throw error;
        return data;
};

const deleteList = async (listId: number) => {
        const { error: listItemsError } = await supabase
                .from("list_items")
                .delete()
                .eq("list_id", listId);

        if (listItemsError) throw listItemsError;

        const { data, error: listError } = await supabase
                .from("lists")
                .delete()
                .eq("id", listId)
                .single();

        if (listError) throw listError;
        return data;
};

const getListItems = async (listId: number) => {
        const { data, error } = await supabase
                .from("list_items")
                .select("*")
                .eq("list_id", listId)
                .order("created_at", { ascending: true });

        if (error) throw error;
        return data;
};

const updateListItem = async (itemId: number, content: string) => {
        const { data, error } = await supabase
                .from("list_items")
                .insert({ content })
                .eq("id", itemId)
                .single();

        if (error) throw error;
        return data;
};

const insertListItems = async (items: ListItem[]) => {
        const { data, error } = await supabase
                .from("list_items")
                .insert(items)
                .select();

        if (error) throw error;
        return data;
};

const updateListItemChecked = async (itemId: number, isChecked: boolean) => {
        const { data, error } = await supabase
                .from("list_items")
                .update({ is_checked: isChecked })
                .eq("id", itemId);

        if (error) throw error;
        return data?.[0];
};

const deleteListItems = async (listId: number) => {
        const { data, error } = await supabase
                .from("list_items")
                .delete()
                .eq("list_id", listId);

        if (error) throw error;
        return data;
};

export default {
        getLists,
        createList,
        deleteList,
        getListItems,
        updateListItem,
        insertListItems,
        updateListItemChecked,
        deleteListItems,
};
