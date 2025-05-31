import { Category, Meal } from ".";

export type RootParamList = {
        Welcome: undefined;
        MealDetails: { mealId: number };
        Found: { meals: Meal[] };
        ListItem: { listId: number; title: string };
        UserProfile: { userId: string };
        DisplayMeals: {
                meals?: Meal[];
                categoryId?: number;
                categoryName?: string;
        };
};
