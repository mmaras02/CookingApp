import { supabase } from "@/lib/supabase";

const getMeals = async () => {
  const { data, error } = await supabase
    .from('meals')
    .select("*");

  if (error) {
    throw new Error("Error fetching meals");
  }
  return data;
};

export default { getMeals };
    