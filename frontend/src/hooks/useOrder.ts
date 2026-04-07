import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as api from "../api/orderApi";

export const useOrders = (id?: string) => {
    const queryClient = useQueryClient();

    // 1. Lấy danh sách đơn hàng
    const listQuery = useQuery({
        queryKey: ["orders"],
        queryFn: api.fetchOrderList,
        select: (data) => data?.items || data || [],
    });

    // 2. Lấy chi tiết đơn hàng
    const detailQuery = useQuery({
        queryKey: ["orders", "detail", id],
        queryFn: () => api.fetchOrderDetail(id!),
        enabled: !!id,
        staleTime: 10 * 60 * 1000
    });
    const userOrderQuery = useQuery({
        queryKey: ["my-orders"],
        queryFn: api.fetchUSerOrder,
        select: (data) => data?.items || data || [],
        retry: 0
    }
    )
    // 3. TẠO ĐƠN HÀNG (Dùng cho Checkout)
    const createMutation = useMutation({
        mutationFn: api.fetchCreateOrder,
        onSuccess: () => {

            queryClient.invalidateQueries({ queryKey: ["orders"] });
        }
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, status }: { id: string, status: string }) =>
            api.fetchUpdateOrderStatus(id, status),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["orders"] });
            queryClient.invalidateQueries({ queryKey: ["orders", "detail", variables.id] });
        }
    });

    // 5. XÓA ĐƠN HÀNG
    const deleteMutation = useMutation({
        mutationFn: api.fetchDeleteOrder,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["orders"] });
        }
    });

    return {
        // Data
        orders: listQuery.data,
        orderDetail: detailQuery.data,
        userOrder: userOrderQuery.data,
        // Status
        isLoadingUserOrder: userOrderQuery.isLoading,
        isLoadingOrder: listQuery.isLoading,
        isLoadingDetail: detailQuery.isLoading,
        isCreating: createMutation.isPending, // Trạng thái đang tạo đơn
        isUpdating: updateMutation.isPending,
        isDeleting: deleteMutation.isPending,

        //error
        isErrorUserOrder: userOrderQuery.isError,
        isErrorOrder: listQuery.isError,
        isErrorDetail: detailQuery.isError,

        // Actions
        createOrder: createMutation.mutateAsync, // Dùng mutateAsync để xử lý try/catch ở UI
        updateOrder: updateMutation.mutate,
        deleteOrder: deleteMutation.mutate
    };
};