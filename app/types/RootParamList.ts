import { Category, Meal } from ".";

export type RootParamList = {
        Welcome: undefined;
        MealDetails: { mealId: number };
        Category: {
                categories?: Category[];
                categoryId?: number;
                categoryName?: string;
        };
        Found: { meals: Meal[] };
        ListItem: { listId: number; title: string };
        UserProfile: { userId: string };
        DisplayMeals: {
                meals?: Meal[];
                categoryId?: number;
                categoryName?: string;
        };
};
