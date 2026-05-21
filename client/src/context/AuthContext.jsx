// React tools
import { createContext, useEffect, useState } from "react";

// React toastify
import { toast } from "react-toastify";

// Services
import { fetchMe, fetchSignin, fetchSignout, fetchSignup } from "../services/AuthService";

// React Router
import { useNavigate } from "react-router";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Useeffect to auto login
    useEffect(() => {
        const getMe = async () => {
            try {
                const res = await fetchMe();

                setUser(res.data.data.user);
                setLoading(false);
            } catch (err) {
                setLoading(false);
                console.log(err);
            }
        }

        getMe();
    }, [navigate]);

    // Function to register new user
    const register = async (data) => {
        try {
            const res = await fetchSignup(data);

            navigate("/login");
            toast.success(res.data.message);
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }

    // Function to login user
    const login = async (data) => {
        try {
            const res = await fetchSignin(data);

            setUser(res.data.data.user);
            navigate("/profile");
            toast.success(res.data.message);
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }

    // Function to logout (clear cookies section)
    const logout = async () => {
        try {
            const res = await fetchSignout();

            setUser(null);
            toast.success(res.data.message);
            navigate("/login");
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }

    return (
        <AuthContext.Provider value={{ user, loading, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}
