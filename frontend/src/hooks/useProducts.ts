import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as api from "../api/productApi";

export const useProduct = (id?: string, slug?: string) => {
    const queryClient = useQueryClient();

    //danh sách sản phẩm
    const listQuery = useQuery({
        queryKey: ["products"],
        queryFn: api.fetchProductList,
    });

    //danh sách sản phẩm thuộc danh mục
    const listProductByCategory = useQuery({
        queryKey: ["product-by-category", slug],
        queryFn: () => api.fetchProductByCategory(slug!),
        enabled: !!slug,
        staleTime: 10 * 60 * 1000

    });

    //chi tiết sản phẩm
    const detailQuery = useQuery({
        queryKey: ["products", "detail", id],
        queryFn: () => api.fetchProductDetail(id!),
        enabled: !!id,
        staleTime: 10 * 60 * 1000
    });

    //thêm sản phẩm 
    const createMutation = useMutation({
        mutationFn: api.fetchCreateProduct, // Đảm bảo trong api/productApi.ts đã export hàm này
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
        }
    });

    //cập nhật sản phẩm
    const updateMutation = useMutation({
        // API này nhận object { id, productData }
        mutationFn: api.fetchUpdateProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
            if (id) queryClient.invalidateQueries({ queryKey: ["products", "detail", id] });
        }
    });

    //xóa sản phẩm
    const deleteMutation = useMutation({
        mutationFn: api.fetchDeleteproduct,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
        }
    });

    //upload file
    const uploadMutation = useMutation({
        mutationFn: api.fetchUploadImage,
    });
    return {

        //dữ liệu
        products: listQuery.data,
        productDetail: detailQuery.data,
        productByCategory: listProductByCategory,

        //trạng thái loading
        isLoadingProductByCategory: listProductByCategory.isLoading,
        isLoadingProducts: listQuery.isLoading,
        isLoadingDetail: detailQuery.isLoading,
        isCreating: createMutation.isPending,
        isUpdating: updateMutation.isPending,
        isDeleting: deleteMutation.isPending,
        isUploadingImage: uploadMutation.isPending,

        //trạng thái lỗi
        isErrorProductByCategory: listProductByCategory.isError,
        isErrorProducts: listQuery.isError,
        isErrorDetail: detailQuery.isError,

        //hành động
        uploadImage: uploadMutation.mutateAsync,
        createProduct: createMutation.mutate,
        updateProduct: updateMutation.mutate,
        deleteProduct: deleteMutation.mutate
    };
};