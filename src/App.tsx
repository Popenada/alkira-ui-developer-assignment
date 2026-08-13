import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import { LoginPage } from './routes/LoginPage'

const router = createBrowserRouter([
  { path: '/login', element: <LoginPage /> },
  { path: '/', element: <Navigate to="/login" replace /> },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
