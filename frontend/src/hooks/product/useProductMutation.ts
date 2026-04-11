import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as api from "../../api/productApi";

export const useProductMutations = (id?: string) => {
    const queryClient = useQueryClient();

    const invalidateProducts = () => {
        queryClient.invalidateQueries({ queryKey: ["products"] });
    };

    const createMutation = useMutation({
        mutationFn: api.fetchCreateProduct,
        onSuccess: invalidateProducts,
    });

    const updateMutation = useMutation({
        mutationFn: api.fetchUpdateProduct,
        onSuccess: () => {
            invalidateProducts();
            if (id) {
                queryClient.invalidateQueries({
                    queryKey: ["products", "detail", id],
                });
            }
        },
    });

    const deleteMutation = useMutation({
        mutationFn: api.fetchDeleteproduct,
        onSuccess: invalidateProducts,
    });

    const uploadMutation = useMutation({
        mutationFn: api.fetchUploadImage,
    });

    return {
        createProduct: createMutation.mutate,
        updateProduct: updateMutation.mutate,
        deleteProduct: deleteMutation.mutate,
        uploadImage: uploadMutation.mutateAsync,

        isCreating: createMutation.isPending,
        isUpdating: updateMutation.isPending,
        isDeleting: deleteMutation.isPending,
        isUploadingImage: uploadMutation.isPending,
    };
};