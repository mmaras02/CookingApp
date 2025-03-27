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

const getMealById = async (id : number) => {
  const { data, error } = await supabase
    .from('meals')
    .select()
    .eq('id', id)
    .single();

  if (error) {
    throw new Error("Error fetching meal by id");
  }
  return data;
}

export default { getMeals, getMealById };
    