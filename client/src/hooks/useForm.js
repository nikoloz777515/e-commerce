// React tools
import { useState } from "react"

// Custom hook to use forms
export const useForm = (initValue) => {
    const [formData, setFormData] = useState(initValue || {});

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setFormData(prev => ({ ...prev, [name]: value }));
    }

    const handleSubmit = (e, cb) => {
        e.preventDefault();

        cb(formData);
    }

    const resetForm = () => setFormData(initValue);

    return [formData, handleChange, handleSubmit, resetForm];
}
