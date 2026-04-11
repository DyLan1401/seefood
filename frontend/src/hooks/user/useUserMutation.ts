import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as api from "../../api/userApi";
import { useAuthStore } from "../../store/authStore";

export const useUserMutations = (id?: string) => {
    const queryClient = useQueryClient();
    const setLogin = useAuthStore((state) => state.setLogin);


    const invalidateUsers = () => {
        queryClient.invalidateQueries({ queryKey: ["users"] });
    };

    //đăng nhập
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

    });
    const registerMutation = useMutation({

        mutationFn: ({ email, password }: { email: string, password: string }) => api.fetchRegister(email, password),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
        onError: (error) => {
            console.error('Lỗi đăng ký:', error);
        }
    });


    //cập nhật người dùng
    const updateMutation = useMutation({
        mutationFn: api.fetchUpdateUser,
        onSuccess: () => {
            invalidateUsers();
            if (id) {
                queryClient.invalidateQueries({
                    queryKey: ["users", "detail", id],
                });
            }
        },
    });

    //xóa người dùng
    const deleteMutation = useMutation({
        mutationFn: api.fetchDeleteUser,
        onSuccess: invalidateUsers,
    });


    return {

        //trạng thái loading
        isRegister: registerMutation.isPending,
        isLogin: loginMutation.isPending,
        isUpdating: updateMutation.isPending,
        isDeleting: deleteMutation.isPending,

        //hành động 
        register: registerMutation.mutate,
        login: loginMutation.mutate,
        updateUser: updateMutation.mutate,
        deleteUser: deleteMutation.mutate
    };
};