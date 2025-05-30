import { Ingredient } from ".";

export type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

export type CategoriesProps = {
        selectedCategories: number[];
        setSelectedCategories: SetState<number[]>;
};

export type ImageInputProps = {
        imageUrl: string | null;
        setImageUrl: SetState<string | null>;
        bucketName: string;
        imageHeight?: number;
        imageWidth?: number;
};

export type IngredientInputProps = {
        ingredients: Ingredient[];
        setIngredients: SetState<Ingredient[]>;
};

export type StepInputProps = {
        steps: string[];
        setSteps: SetState<string[]>;
};

export type TitleInputProps = {
        title: string;
        setTitle: SetState<string>;
};
