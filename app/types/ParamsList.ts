import { Category } from "./Meal";

export type ParamsList = {
    Welcome: undefined;
    Home: undefined;
    MealDetails: { mealId: number };
    Category: { categories?: Category[]; categoryId?: number };
};
