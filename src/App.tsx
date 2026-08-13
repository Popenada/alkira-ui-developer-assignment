import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import { LoginPage } from './routes/LoginPage'
import { SignupPage } from './routes/SignUpPage'
import { MfaPage } from './routes/MfaPage'
import { ProtectedRoute } from './features/auth/ProtectedRoute'
import { DashboardPage } from './routes/DashboardPage'
const router = createBrowserRouter([
  { path: '/login', element: <LoginPage /> },
  { path: '/', element: <Navigate to="/dashboard" replace /> },
  { path: '/signup', element: <SignupPage /> },
  { path: '/mfa', element: <MfaPage />},
  {
    element: <ProtectedRoute />,
    children: [
        { path: '/dashboard', element: <DashboardPage /> },
    ],
},

])

function App() {
  return <RouterProvider router={router} />
}

export default App
