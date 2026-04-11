import { useQuery } from "@tanstack/react-query";
import * as api from "../../api/userApi";

export const useUserList = () => {
    const queryList = useQuery({
        queryKey: ["users"],
        queryFn: api.fetchUserList,
        staleTime: 5 * 60 * 1000,
    });

    return {
        users: queryList.data,
        isLoading: queryList.isLoading,
        isError: queryList.isError,
    };
};