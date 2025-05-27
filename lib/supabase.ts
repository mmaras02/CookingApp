import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import { Platform } from "react-native";

const SUPABASE_URL = process.env.EXPO_PUBLIC_DB_URL;
const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_DB_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
        throw new Error(
                "Missing Supabase URL or Key! Check your environment variables."
        );
}

const getStorage = () => {
        if (Platform.OS === "web") {
                if (typeof window !== "undefined") {
                        return localStorage;
                }
                return {
                        getItem: () => null,
                        setItem: () => {},
                        removeItem: () => {},
                };
        }
        return AsyncStorage;
};

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
        auth: {
                storage: getStorage(),
                autoRefreshToken: true,
                persistSession: true,
                detectSessionInUrl: Platform.OS === "web",
        },
});
