import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as api from "../../api/categoryApi";

export const useCategoryMutations = (id?: string) => {
    const queryClient = useQueryClient();

    const invalidateCategories = () => {
        queryClient.invalidateQueries({ queryKey: ["categories"] });
    };

    const createMutation = useMutation({
        mutationFn: api.fetchCreateCategory,
        onSuccess: invalidateCategories,
    });

    const updateMutation = useMutation({
        mutationFn: api.fetchUpdateCategory,
        onSuccess: () => {
            invalidateCategories();
            if (id) {
                queryClient.invalidateQueries({
                    queryKey: ["categories", "detail", id],
                });
            }
        },
    });

    const deleteMutation = useMutation({
        mutationFn: api.fetchDeleteCategory,
        onSuccess: invalidateCategories,
    });

    const uploadMutation = useMutation({
        mutationFn: api.uploadCategoryImage,
    });

    return {
        createCategory: createMutation.mutate,
        updateCategory: updateMutation.mutate,
        deleteCategory: deleteMutation.mutate,
        uploadImage: uploadMutation.mutateAsync,

        isCreating: createMutation.isPending,
        isUpdating: updateMutation.isPending,
        isDeleting: deleteMutation.isPending,
        isUploadingImage: uploadMutation.isPending,
    };
};