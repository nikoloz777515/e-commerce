// React tools
import { useContext } from "react";

// Context
import { AuthContext } from "../context/AuthContext";

// Hook to use authcontext
export const useAuth = () => useContext(AuthContext);

