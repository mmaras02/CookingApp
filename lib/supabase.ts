import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.EXPO_PUBLIC_DB_URL as string; 
const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_DB_KEY as string;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error("Missing Supabase URL or Key! Check your environment variables.");
  }

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
