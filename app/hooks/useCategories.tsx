import categoryServices from "../services/categoryServices";
import { useQuery } from "@tanstack/react-query";

export const useCategories = () => {
    return useQuery({
        queryKey: ['categories'],
        queryFn: () => categoryServices.getCategories(),
    })
}
