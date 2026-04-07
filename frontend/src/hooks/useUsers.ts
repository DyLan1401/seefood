import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as api from "../api/userApi";
import { useAuthStore } from '../store/authStore';

export const useUsers = (userId?: string) => {
    const queryClient = useQueryClient();


    const setLogin = useAuthStore((state) => state.setLogin);
    // 1. LẤY TOÀN BỘ DANH SÁCH USER
    const listQuery = useQuery({
        queryKey: ["users"],
        queryFn: api.fetchUserList,
    });

    // 2. LẤY CHI TIẾT USER ()
    const detailQuery = useQuery({
        queryKey: ["users", "detail", userId],
        queryFn: () => api.fetchUserDetail(userId!),
        enabled: !!userId,
        staleTime: 10 * 60 * 1000
    });

    // 3. ĐĂNG KÝ
    const registerMutation = useMutation({

        mutationFn: ({ email, password }: { email: string, password: string }) => api.fetchRegister(email, password),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
        onError: (error) => {
            console.error('Lỗi đăng ký:', error);
        }
    });

    // 4. ĐĂNG NHẬP
    const loginMutation = useMutation({
        mutationFn: ({ email, password }: { email: string, password: string }) => api.fetchLogin(email, password),
        onSuccess: (data) => {
            if (data?.token) {
                // GỌI HÀM LOGIC TRONG AUTHSTORE CỦA BẠN TẠI ĐÂY
                setLogin(data.token, data.user);
            }
            // Xóa sạch cache cũ để đảm bảo người dùng mới không thấy data của người cũ
            queryClient.clear();
        },
        onError: (error) => {
            console.error('Lỗi đăng nhập:', error.message);
        }
    });

    // 5. CẬP NHẬT
    const updateMutation = useMutation({
        mutationFn: api.fetchUpdateUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
            // Nếu đang xem chi tiết, làm mới luôn cả detail của user đó
            if (userId) queryClient.invalidateQueries({ queryKey: ["users", "detail", userId] });
        }
    });

    const deleteMutation = useMutation({
        mutationFn: api.fetchDeleteUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
        }
    });


    return {

        // Data
        users: listQuery.data,
        userDetail: detailQuery.data,

        // Trạng thái loading
        isLoadingList: listQuery.isLoading,
        isLoadingDetail: detailQuery.isLoading,
        isLoggingIn: loginMutation.isPending,
        isRegistering: registerMutation.isPending,
        isUpdating: updateMutation.isPending,
        isDeleting: deleteMutation.isPending,

        // Hành động (Actions)
        Register: registerMutation.mutate,
        login: loginMutation.mutate,
        updateUser: updateMutation.mutate,
        deleteUser: deleteMutation.mutate
    };
};