export type Meal = {
    id: number,
    name: string | undefined,
    image_url : string | undefined,
}

export type Ingredient = {
  id: number;
  name: string | undefined;
  image_url: string | undefined;
  quantity?: number | undefined;
};

export type Recipe = {
  step_number: number;
  instructions: string;
}

export type Category = {
  id: number;
  name: string | undefined;
}