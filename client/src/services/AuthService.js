// Acios
import { api } from "../api/Axios"

// Service to register new user
export const fetchSignup = async (data) => {
    return await api.post("/auth/signup", data);
};

// Service to login user
export const fetchSignin = async (data) => {
    return await api.post("/auth/signin", data);
};

// Service to logout user (clear cookies section)
export const fetchSignout = async () => {
    return await api.post("/auth/signout");
};

// Service to auto login
export const fetchMe = async () => {
    return await api.get("/auth/me");
}

//get alluser
export const fetchAllUsers = async () => {
    return await api.get("/user"); 
};

// cnage user role
export const fetchUpdateUserRole = async (userId, role) => {
    return await api.patch(`/user/${userId}/role`, { role });
};

//user delete
export const fetchDeleteUser = async (userId) => {
    return await api.delete(`/user/${userId}`);
};