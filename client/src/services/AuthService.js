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
