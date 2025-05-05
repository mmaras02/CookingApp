import { Ingredient } from "./Meal";

export type CategoriesProps = {
    selectedCategories: string[];
    setSelectedCategories: (value: string[]) => void;
};

export type ImageInputProps = {
    imageUrl: string | null;
    setImageUrl: (url: string | null) => void;
};

export type IngredientInputProps = {
    ingredients: Ingredient[];
    setIngredients: (ingredients: Ingredient[]) => void;
};

export type StepInputProps = {
    steps: string[];
    setSteps: (steps: string[]) => void;
};

export type TitleInputProps = {
    title: string;
    setTitle: (title: string) => void;
};