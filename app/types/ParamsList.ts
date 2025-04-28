import { Category, Meal } from "./Meal";

export type ParamsList = {
    Welcome: undefined;
    MealDetails: { mealId: number };
    Category: { categories?: Category[]; categoryId?: number };
    Found: { meals: Meal[]};
    ListItem: { listId: number, title: string}
};