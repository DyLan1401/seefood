import { useQuery } from "@tanstack/react-query";
import * as api from "../../api/orderApi";

export const useOrderList = () => {
    const queryList = useQuery({
        queryKey: ["orders"],
        queryFn: api.fetchOrderList,
        select: (data) => data?.items || data || [],
        staleTime: 5 * 60 * 1000,
    });

    return {
        orders: queryList.data,
        isLoading: queryList.isLoading,
        isError: queryList.isError,
    };
};

//đơn hàng cá nhân

export const useMyOrder = () => {
    const OrderOrderQuery = useQuery({
        queryKey: ["my-orders"],
        queryFn: api.fetchUSerOrder,
        select: (data) => data?.items || data || [],
        retry: 0
    });

    return {
        myOrder: OrderOrderQuery.data,
        isLoading: OrderOrderQuery.isLoading,
        isError: OrderOrderQuery.isError,
    }
}