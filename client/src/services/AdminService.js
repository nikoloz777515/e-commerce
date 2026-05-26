import { api } from "../api/Axios";


// Service to get all products
export const fetchAllProducts = async () => {
    return await api.get("/product");
};

// Service to create product with category ID
export const fetchCreateProduct = async (categoryId, formData) => {
    return await api.post(`/product/${categoryId}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
};

// Service to edit product
export const fetchUpdateProduct = async (id, formData) => {
    return await api.patch(`/product/${id}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
};

// Service to delete product
export const fetchDeleteProduct = async (id) => {
    return await api.delete(`/product/${id}`);
};


// Service to get all users
export const fetchAllUsers = async () => {
    return await api.get("/user");
};

// Service to update user role
export const fetchUpdateUserRole = async (userId, role) => {
    return await api.patch(`/user/${userId}/role`, { role });
};

// Service to delete user
export const fetchDeleteUser = async (userId) => {
    return await api.delete(`/user/${userId}`);
};