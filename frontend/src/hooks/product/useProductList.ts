import { useQuery } from "@tanstack/react-query";
import * as api from "../../api/productApi";

export const useProductList = () => {
    const queryList = useQuery({
        queryKey: ["products"],
        queryFn: api.fetchProductList,
        staleTime: 5 * 60 * 1000,
        retry: 0
    });

    return {
        products: queryList.data,
        isLoading: queryList.isLoading,
        isError: queryList.isError,
    };
};