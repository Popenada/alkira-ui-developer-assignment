import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from '@/app/hooks'

export function ProtectedRoute() {
    const status = useAppSelector((state) => state.auth.status)

    if (status === "unauthenticated") {
        return <Navigate to="/login" replace/>
    }
    
    if (status === "Awaiting MFA") {
        return <Navigate to="/mfa" replace/>
    }
    
    return <Outlet/>
}