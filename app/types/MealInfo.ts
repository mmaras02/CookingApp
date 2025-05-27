export type Meal = {
        id: number;
        name: string;
        image_url?: string | null;
        user_id: string;
        difficulty?: string;
        prep_time: number;
        percentage_match?: number[];
};

export type MealCreate = Omit<Meal, "id">;

export type Ingredient = {
        id?: number;
        name: string;
        image_url?: string;
        quantity?: string;
};

export type Recipe = {
        step_number: number;
        instructions: string;
};

export type Category = {
        id?: number;
        name: string;
};

export type Review = {
        id?: number;
        user_id: string;
        meal_id: number;
        rating: number;
        comment: string;
        profiles?: any;
};
