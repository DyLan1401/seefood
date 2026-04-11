import { useQuery } from "@tanstack/react-query";
import * as api from "../../api/productApi";

export const useProductDetail = (id?: string) => {
    const detailQuery = useQuery({
        queryKey: ["products", "detail", id],
        queryFn: () => api.fetchProductDetail(id!),
        enabled: !!id,
        staleTime: 10 * 60 * 1000,
    });

    return {
        product: detailQuery.data,
        isLoading: detailQuery.isLoading,
        isError: detailQuery.isError,
    };
};

export const useProductByCategory = (slug?: string) => {
    const query = useQuery({
        queryKey: ["product-by-category", slug],
        queryFn: () => api.fetchProductByCategory(slug!),
        enabled: !!slug,
        staleTime: 10 * 60 * 1000,
    });

    return {
        products: query.data,
        isLoading: query.isLoading,
        isError: query.isError,
    };
};