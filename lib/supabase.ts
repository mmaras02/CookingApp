import { createClient } from "@supabase/supabase-js";
import { DB_URL, DB_KEY } from '@env';

const SUPABASE_URL = DB_URL as string; 
const SUPABASE_ANON_KEY = DB_KEY as string;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error("Missing Supabase URL or Key! Check your environment variables.");
  }

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
