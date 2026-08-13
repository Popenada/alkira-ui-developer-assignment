import { useAppSelector, useAppDispatch } from '@/app/hooks'
import { logout } from '@/features/auth/authSlice'
import { useNavigate, Navigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

// Editable resources displayed on dashboard
const MOCK_RESOURCES = [
    { id: 1, name: 'Production VPC' },
    { id: 2, name: 'Staging Network Policy' },
    { id: 3, name: 'US-East Segment' },
]

export function DashboardPage() {
    const user = useAppSelector((state) => state.auth.user)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    if (!user) {
        return <Navigate to="/login" replace />
    }

    function handleLogout() {
        dispatch(logout())
        navigate('/login')
    }

    return (
        <div className="min-h-screen p-6">
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-semibold">Dashboard</h1>
                    <p className="text-sm text-muted-foreground">
                        Signed in as {user.name}{" "}
                        <Badge variant={user.role === 'read-write' ? 'default' : 'secondary'}>
                            {user.role}
                        </Badge>
                    </p>
                </div>
                <Button variant="outline" onClick={handleLogout}>
                    Log out
                </Button>
            </div>

            {/* resource list goes here next */}
            {MOCK_RESOURCES.map((resource) => (
                <div key={resource.id} className="flex items-center justify-between border-b py-2">
                <span>{resource.name}</span>
                <Button
                    size="sm"
                    variant="outline"
                    disabled={user.role === 'read-only'}
                >
                    Edit
                </Button>
    </div>
))}

        </div>
    )
}
