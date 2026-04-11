//lib
import { Trash2, SquarePen, UserCircle, Plus, ShieldCheck } from 'lucide-react';

//zustands
import { useToastStore } from "../../store/useToastStore";

//hooks
import { useUsers } from "../../hooks/useUsers";

//types
import type { User } from '../../types/user';


export default function AdminUsers() {
    const showToast = useToastStore((state) => state.show);

    //custom hooks
    const {
        users,
        deleteUser,
        updateUser,
        isLoadingList,
        isDeleting,
        isUpdating
    } = useUsers();

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Header  */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-black text-gray-800 tracking-tight">Quản Lý Người Dùng</h1>
                    <p className="text-sm text-gray-500 font-medium">Quản lý tài khoản và phân quyền hệ thống</p>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-blue-100">
                    <Plus size={20} /> Thêm người dùng
                </button>
            </div>

            {isLoadingList ? (
                <div className="flex flex-col items-center justify-center h-64 bg-white rounded-3xl border border-dashed border-gray-200">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mb-4"></div>
                    <p className="text-gray-400 font-medium">Đang tải danh sách...</p>
                </div>
            ) : users.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
                    <UserCircle size={48} className="mx-auto text-gray-200 mb-4" />
                    <p className="text-gray-400 font-medium">Chưa có người dùng nào.</p>
                </div>
            ) : (
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50/50 border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-4 text-xs uppercase font-black text-gray-400 tracking-widest">Thông tin tài khoản</th>
                                    <th className="px-6 py-4 text-xs uppercase font-black text-gray-400 tracking-widest text-center">Vai trò</th>
                                    <th className="px-6 py-4 text-xs uppercase font-black text-gray-400 tracking-widest text-center">Hành động</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {users.map((u: User) => (
                                    <tr key={u.id} className="hover:bg-blue-50/30 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
                                                    <UserCircle size={24} />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-800">{u.email}</p>
                                                    <p className="text-[10px] text-gray-400 font-mono italic">UID: {u.id}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider flex items-center justify-center gap-1 w-fit mx-auto ${u.role === 'admin' ? 'bg-purple-50 text-purple-600' : 'bg-gray-100 text-gray-600'
                                                }`}>
                                                {u.role === 'admin' && <ShieldCheck size={12} />}
                                                {u.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-center gap-2">
                                                <button
                                                    disabled={isUpdating}
                                                    onClick={() => {
                                                        const newRole = window.prompt("Nhập vai trò mới (admin/user):", u.role);
                                                        if (newRole && newRole !== u.role) {
                                                            updateUser({ ...u, role: newRole });
                                                        }
                                                    }}
                                                    className="p-2.5 text-blue-600 hover:bg-blue-100 rounded-xl transition-all"
                                                >
                                                    <SquarePen size={18} />
                                                </button>
                                                <button
                                                    disabled={isDeleting}
                                                    onClick={() => {
                                                        if (window.confirm(`Xác nhận xóa tài khoản: ${u.email}?`)) {
                                                            deleteUser(u.id, {
                                                                onSuccess: () => showToast(`Đã xóa ${u.email}`, "success"),
                                                                onError: () => showToast(`đã bị lỗi khi xóa ${u.email}`, "error")
                                                            });
                                                        }
                                                    }}
                                                    className="p-2.5 text-red-500 hover:bg-red-100 rounded-xl transition-all"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}