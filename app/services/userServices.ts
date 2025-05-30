import { supabase } from "@/lib/supabase";
import { UserProfile } from "../types";

const getUserById = async (userId: string) => {
        const { data, error } = await supabase
                .from("profiles")
                .select("*")
                .eq("id", userId)
                .single();

        if (error) throw error;
        return data;
};

const editProfile = async (userId: string, user: UserProfile) => {
        const { data, error } = await supabase
                .from("profiles")
                .update(user)
                .eq("id", userId)
                .single();

        if (error) throw error;
        return data;
};

export default { getUserById, editProfile };
