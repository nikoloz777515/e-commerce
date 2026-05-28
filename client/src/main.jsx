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
import { AdminProvider } from './context/AdminContext.jsx';

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
		<AuthProvider>
			<AdminProvider>
					<App />
				<ToastContainer position='bottom-right' />
			</AdminProvider>
		</AuthProvider>
	</BrowserRouter>
)
