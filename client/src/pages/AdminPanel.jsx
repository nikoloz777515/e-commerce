import { useEffect, useState } from "react";
import { fetchAllUsers, fetchUpdateUserRole, fetchDeleteUser } from "../services/AuthService";
import { toast } from "react-toastify";

const AdminPanel = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    // იუზერების ჩატვირთვა გვერდის გახსნისას
    useEffect(() => {
        const getUsers = async () => {
            try {
                const res = await fetchAllUsers();
                // 💡 შენი ბექენდის მიხედვით, მასივი არის პირდაპირ res.data.data-ში
                setUsers(res.data.data || []); 
                setLoading(false);
            } catch (err) {
                toast.error("მონაცემების წამოღება ვერ მოხერხდა");
                setLoading(false);
            }
        };
        getUsers();
    }, []);

    // როლის შეცვლის ფუნქცია
    const handleRoleChange = async (userId, newRole) => {
        try {
            await fetchUpdateUserRole(userId, newRole);
            toast.success("როლი წარმატებით შეიცვალა!");
            setUsers(users.map(u => u._id === userId ? { ...u, role: newRole } : u));
        } catch (err) {
            toast.error("როლის შეცვლა ვერ მოხერხდა");
        }
    };

    // იუზერის წაშლის ფუნქცია
    const handleDelete = async (userId) => {
        if (!window.confirm("ნამდვილად გსურთ მომხმარებლის წაშლა?")) return;
        
        try {
            await fetchDeleteUser(userId);
            toast.success("მომხმარებელი წაიშალა");
            setUsers(users.filter(u => u._id !== userId));
        } catch (err) {
            toast.error("წაშლა ვერ მოხერხდა");
        }
    };

    if (loading) return <div className="text-center mt-10 text-slate-600 font-semibold">იტვირთება...</div>;

    return (
        <div className="max-w-6xl mx-auto p-6 bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 mt-10">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-slate-800">Admin Panel — Users</h2>
                <span className="bg-slate-100 text-slate-700 px-4 py-1.5 rounded-full text-sm font-medium">
                    სულ: {users.length} იუზერი
                </span>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-100">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-100 text-slate-600 font-semibold text-sm">
                            <th className="p-4">სახელი</th>
                            <th className="p-4">ელ-ფოსტა</th>
                            <th className="p-4">როლი</th>
                            <th className="p-4 text-center">მოქმედება</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 text-slate-700 text-sm">
                        {users.map((user) => (
                            <tr key={user._id} className="hover:bg-slate-50/80 transition-colors">
                                <td className="p-4 font-medium text-slate-900">{user.fullname}</td>
                                <td className="p-4 text-slate-500">{user.email}</td>
                                <td className="p-4">
                                    <select
                                        value={user.role || "user"}
                                        onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                        className="bg-slate-100 border border-slate-200 rounded-xl px-2 py-1 outline-none text-slate-800 font-medium text-xs focus:ring-2 focus:ring-cyan-300 cursor-pointer"
                                    >
                                        <option value="user">User</option>
                                        <option value="seller">Seller</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </td>
                                <td className="p-4 text-center">
                                    <button
                                        onClick={() => handleDelete(user._id)}
                                        className="text-red-500 hover:text-red-700 font-semibold transition-colors px-3 py-1 rounded-xl hover:bg-red-50 cursor-pointer"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminPanel;