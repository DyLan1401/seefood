import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as api from "../api/categoryApi";

export const useCategory = (id?: string) => {
    const queryClient = useQueryClient();

    //danh sách danh mục
    const listQuery = useQuery({
        queryKey: ["categories"],
        queryFn: api.fetchCategoryList,
    });

    //chi tiết danh mục
    const detailQuery = useQuery({
        queryKey: ["categories", "detail", id],
        queryFn: () => api.fetchCategoryDetail(id!),
        enabled: !!id,
        staleTime: 10 * 60 * 1000
    });

    //tạo danh mục
    const createMutation = useMutation({
        mutationFn: api.fetchCreateCategory,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
        }
    });

    //cập nhật danh mục
    const updateMutation = useMutation({
        // API này nhận object { id, productData }
        mutationFn: api.fetchUpdateCategory,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
            if (id) queryClient.invalidateQueries({ queryKey: ["categories", "detail", id] });
        }
    });

    //xóa danh mục
    const deleteMutation = useMutation({
        mutationFn: api.fetchDeleteCategory,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
        }
    });

    //upload file (Async)
    const uploadMutation = useMutation({
        mutationFn: api.uploadCategoryImage,
    });


    return {

        //dữ liệu
        categories: listQuery.data,
        CategoryDetail: detailQuery.data,

        //trạng thái loading
        isLoadingCategory: listQuery.isLoading,
        isLoadingDetail: detailQuery.isLoading,
        isCreating: createMutation.isPending,
        isUpdating: updateMutation.isPending,
        isDeleting: deleteMutation.isPending,
        isUploading: uploadMutation.isPending,

        //trạng thái lỗi
        isErrorCategory: listQuery.isError,
        isErrorDetail: detailQuery.isError,

        //hành động 
        uploadImage: uploadMutation.mutateAsync,
        createCategory: createMutation.mutate,
        updateCategory: updateMutation.mutate,
        deleteCategory: deleteMutation.mutate
    };
};