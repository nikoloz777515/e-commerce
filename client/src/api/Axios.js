import axios from "axios";

const URL = import.meta.env.VITE_SERVER_URL;

export const api = axios.create({
    baseURL: URL,
    withCredentials: true
});

