import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import { LoginPage } from './routes/LoginPage'
import { SignupPage } from './routes/SignUpPage'
import { MfaPage } from './routes/MfaPage'
const router = createBrowserRouter([
  { path: '/login', element: <LoginPage /> },
  { path: '/', element: <Navigate to="/login" replace /> },
  { path: '/signup', element: <SignupPage /> },
  { path: '/mfa', element: <MfaPage />},
])

function App() {
  return <RouterProvider router={router} />
}

export default App
