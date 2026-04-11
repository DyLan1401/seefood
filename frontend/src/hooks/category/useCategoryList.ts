import { useQuery } from "@tanstack/react-query";
import * as api from "../../api/categoryApi";

export const useCategoryList = () => {
    const queryList = useQuery({
        queryKey: ["categories"],
        queryFn: api.fetchCategoryList,
        staleTime: 5 * 60 * 1000,
        retry: 0
    });

    return {
        categories: queryList.data,
        isLoading: queryList.isLoading,
        isError: queryList.isError,
    };
};