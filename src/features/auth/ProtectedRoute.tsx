// Dashboard wrapper as added protection to see if user page is in corespondance to correct status
import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from '@/app/hooks'

export function ProtectedRoute() {
    // Function useAppSelector from Redux Toolkit to access global state status
    const status = useAppSelector((state) => state.auth.status)

    if (status === "unauthenticated") {
        return <Navigate to="/login" replace/>
    }
    
    if (status === "Awaiting MFA") {
        return <Navigate to="/mfa" replace/>
    }
    // Fallback for authenticated users back to child route
    return <Outlet/>
}