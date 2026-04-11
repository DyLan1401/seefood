import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as api from "../../api/orderApi";

export const useOrderMutations = () => {
    const queryClient = useQueryClient();

    const invalidateOrders = () => {
        queryClient.invalidateQueries({ queryKey: ["orders"] });
    };

    const createMutation = useMutation({
        mutationFn: api.fetchCreateOrder,
        onSuccess: invalidateOrders,
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, status }: { id: string, status: string }) =>
            api.fetchUpdateOrderStatus(id, status),
        onSuccess: (_, variables) => {
            invalidateOrders();
            queryClient.invalidateQueries({ queryKey: ["orders", "detail", variables.id] });
        }
    });

    const deleteMutation = useMutation({
        mutationFn: api.fetchDeleteOrder,
        onSuccess: invalidateOrders,
    });



    return {
        createOrder: createMutation.mutateAsync,
        updateOrder: updateMutation.mutate,
        deleteOrder: deleteMutation.mutate,

        isCreating: createMutation.isPending,
        isUpdating: updateMutation.isPending,
        isDeleting: deleteMutation.isPending,
    };
};