export type Meal = {
    id: number,
    name: string,
    image_url : string,
}

export type Ingredient = {
  id?: number;
  name: string ;
  image_url?: string;
  quantity?: string;
};

export type Recipe = {
  step_number: number;
  instructions: string;
}

export type Category = {
  id: number;
  name: string;
}