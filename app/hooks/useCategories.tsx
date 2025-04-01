import { useEffect, useState } from "react";
import { Category } from "../types/Meal";
import categoryServices from "../services/categoryServices";

const useCategories = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await categoryServices.getCategories();
                setCategories(response);
            } catch (error) {
                setError("Error fetching categories");
            }
        };

        fetchCategories();
    }, []);

    return { categories, error };
};

export default useCategories;
