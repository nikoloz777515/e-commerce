// React tools
import { createRoot } from 'react-dom/client'

// Css
import './main.css'

// Import App
import App from './App.jsx'

// React router
import { BrowserRouter } from "react-router";

// React toastify
import { ToastContainer } from "react-toastify";

// Contexts
import { AuthProvider } from './context/AuthContext.jsx';

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
		<AuthProvider>
			<App />
			<ToastContainer position='bottom-right' />
		</AuthProvider>
	</BrowserRouter>
)
