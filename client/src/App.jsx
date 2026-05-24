// React Router tools
import { Route, Routes, Navigate } from "react-router"; // 💡 დავამატეთ Navigate

// Pages
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import AdminPanel from "./pages/AdminPanel"; 

// Components
import ProtectedRoute from "./components/ProtectedRoute";
// 💡 AdminRoute-ის იმპორტი ამოვშალეთ, რადგან აღარ გვჭირდება

import Nav from "./components/Nav";
import Loading from "./components/Loading";

// Hooks
import { useAuth } from "./hooks/useAuth";

const App = () => {
  const { user, loading } = useAuth();

  if (!user && loading) {
    return <Loading />
  }

  return (
    <>
      <Nav />

      <main className="min-h-screen bg-slate-50 text-slate-900 pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          
          {/* 🔒 უსაფრთხო ადმინ როუტი: თუ ადმინია შევიდეს, თუ არა - გადავიდეს მთავარზე */}
          <Route 
            path="/admin" 
            element={user && user.role === "admin" ? <AdminPanel /> : <Navigate to="/" replace />} 
          />
        </Routes>
      </main>
    </>
  )
}

export default App;