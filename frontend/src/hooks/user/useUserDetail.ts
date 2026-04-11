import { useQuery } from "@tanstack/react-query";
import * as api from "../../api/userApi";

export const useUserDetail = (id?: string) => {
    const detailQuery = useQuery({
        queryKey: ["users", "detail", id],
        queryFn: () => api.fetchUserDetail(id!),
        enabled: !!id,
        staleTime: 10 * 60 * 1000,
    });

    return {
        user: detailQuery.data,
        isLoading: detailQuery.isLoading,
        isError: detailQuery.isError,
    };
};
