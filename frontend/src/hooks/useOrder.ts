import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as api from "../api/orderApi";

export const useOrders = (id?: string) => {
    const queryClient = useQueryClient();

    //danh sách đơn hàng
    const listQuery = useQuery({
        queryKey: ["orders"],
        queryFn: api.fetchOrderList,
        select: (data) => data?.items || data || [],
    });

    //Lấy chi tiết đơn hàng
    const detailQuery = useQuery({
        queryKey: ["orders", "detail", id],
        queryFn: () => api.fetchOrderDetail(id!),
        enabled: !!id,
        staleTime: 10 * 60 * 1000
    });

    //đơn hàng cá nhân
    const userOrderQuery = useQuery({
        queryKey: ["my-orders"],
        queryFn: api.fetchUSerOrder,
        select: (data) => data?.items || data || [],
        retry: 0
    });

    //tạo Mutaiton
    const createMutation = useMutation({
        mutationFn: api.fetchCreateOrder,
        onSuccess: () => {

            queryClient.invalidateQueries({ queryKey: ["orders"] });
        }
    });

    //cập nhật đơn hàng
    const updateMutation = useMutation({
        mutationFn: ({ id, status }: { id: string, status: string }) =>
            api.fetchUpdateOrderStatus(id, status),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["orders"] });
            queryClient.invalidateQueries({ queryKey: ["orders", "detail", variables.id] });
        }
    });

    //xóa đơn hàng
    const deleteMutation = useMutation({
        mutationFn: api.fetchDeleteOrder,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["orders"] });
        }
    });

    return {

        //dữ liệu
        orders: listQuery.data,
        orderDetail: detailQuery.data,
        userOrder: userOrderQuery.data,

        //trạng thái loading
        isLoadingUserOrder: userOrderQuery.isLoading,
        isLoadingOrder: listQuery.isLoading,
        isLoadingDetail: detailQuery.isLoading,
        isCreating: createMutation.isPending,
        isUpdating: updateMutation.isPending,
        isDeleting: deleteMutation.isPending,

        //trạng thái lỗi
        isErrorUserOrder: userOrderQuery.isError,
        isErrorOrder: listQuery.isError,
        isErrorDetail: detailQuery.isError,

        //hành động
        createOrder: createMutation.mutateAsync,
        updateOrder: updateMutation.mutate,
        deleteOrder: deleteMutation.mutate
    };
};