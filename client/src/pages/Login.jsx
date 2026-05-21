// Hooks
import { useAuth } from "../hooks/useAuth";
import { useForm } from "../hooks/useForm";

const Login = () => {
    const [formData, handleChange, handleSubmit, resetForm] = useForm({
        email: "",
        password: ""
    });

    const { login } = useAuth();

    return (
        <section className="mx-auto max-w-md rounded-4xl border border-slate-200 bg-white p-8 shadow-2xl shadow-slate-300/30 sm:p-10">
            <h2 className="mb-6 text-3xl font-semibold text-slate-900">Sign In</h2>
            <form onSubmit={(e) => { handleSubmit(e, login); resetForm() }} className="space-y-5">
                <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200"
                />
                <button
                    type="submit"
                    className="w-full rounded-full bg-cyan-600 px-6 py-3 text-base font-semibold text-white transition hover:bg-cyan-500"
                >
                    Login
                </button>
            </form>
        </section>
    )
}

export default Login;