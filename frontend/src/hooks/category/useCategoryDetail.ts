import { useQuery } from "@tanstack/react-query";
import * as api from "../../api/categoryApi";

export const useCategoryDetail = (id?: string) => {
    const detailQuery = useQuery({
        queryKey: ["categories", "detail", id],
        queryFn: () => api.fetchCategoryDetail(id!),
        enabled: !!id,
        staleTime: 10 * 60 * 1000,
    });

    return {
        category: detailQuery.data,
        isLoading: detailQuery.isLoading,
        isError: detailQuery.isError,
    };
};

