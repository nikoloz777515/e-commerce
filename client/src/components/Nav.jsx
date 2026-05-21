import { NavLink } from "react-router";
import { useAuth } from "../hooks/useAuth";

const Nav = () => {
    const { user, logout } = useAuth();

    return (
        <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
            <nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
                <ul className="flex flex-wrap items-center gap-3 text-sm font-medium text-slate-700">
                    <li>
                        <NavLink
                            to={"/"}
                            className={({ isActive }) =>
                                `rounded-full px-4 py-2 transition ${isActive ? "bg-slate-200 text-slate-900" : "hover:bg-slate-100 hover:text-slate-900"}`
                            }
                        >
                            Home
                        </NavLink>
                    </li>
                    {
                        user ? (
                            <>
                                <li>
                                    <NavLink
                                        to={"/profile"}
                                        className={({ isActive }) =>
                                            `rounded-full px-4 py-2 transition ${isActive ? "bg-slate-200 text-slate-900" : "hover:bg-slate-100 hover:text-slate-900"}`
                                        }
                                    >
                                        Profile
                                    </NavLink>
                                </li>
                                <li>
                                    <button
                                        onClick={logout}
                                        className="rounded-full bg-cyan-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-500 cursor-pointer"
                                    >
                                        Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <NavLink
                                        to={"/register"}
                                        className={({ isActive }) =>
                                            `rounded-full px-4 py-2 transition ${isActive ? "bg-slate-200 text-slate-900" : "hover:bg-slate-100 hover:text-slate-900"}`
                                        }
                                    >
                                        Register
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to={"/login"}
                                        className={({ isActive }) =>
                                            `rounded-full px-4 py-2 transition ${isActive ? "bg-slate-200 text-slate-900" : "hover:bg-slate-100 hover:text-slate-900"}`
                                        }
                                    >
                                        Login
                                    </NavLink>
                                </li>
                            </>
                        )
                    }
                </ul>
            </nav>
        </header>
    )
}

export default Nav;