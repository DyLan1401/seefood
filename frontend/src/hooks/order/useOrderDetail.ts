import { useQuery } from "@tanstack/react-query";
import * as api from "../../api/orderApi";

export const useOrderDetail = (id?: string) => {
    const detailQuery = useQuery({
        queryKey: ["orders", "detail", id],
        queryFn: () => api.fetchOrderDetail(id!),
        enabled: !!id,
        staleTime: 10 * 60 * 1000,
    });

    return {
        order: detailQuery.data,
        isLoading: detailQuery.isLoading,
        isError: detailQuery.isError,
    };
};
