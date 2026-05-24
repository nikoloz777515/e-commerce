import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const AdminRoute = () => {
    const { user, loading } = useAuth();

    if (loading) return <div className="text-center mt-10">იტვირთება...</div>;

  
    return user && user.role === "admin" ? <Outlet /> : <Navigate to="/" replace />;
};

export default AdminRoute;