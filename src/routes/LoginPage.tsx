import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema } from '@/lib/validation'
import type { z } from 'zod'
import { useAppDispatch } from '@/app/hooks'
import { useNavigate } from 'react-router-dom'
import { authenticateUser } from '@/lib/mock-auth'
import { useState } from 'react'
import { loginSuccess } from '@/features/auth/authSlice'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

// Login input type that matches correct login schema
type LoginInput = z.infer<typeof loginSchema>



export function LoginPage() {
    
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    // Authenication error checking not in form fields 
    const [authError, setAuthError] = useState<string | null>(null)
    
   // handleSubmit and register validates with the proper loginSchema expressed in validation.ts file
   // Validate data from user expecting LoginInput type, using Zod validation login Schema
    const {
        register,
        handleSubmit,
        formState: { errors }, 
    } = useForm<LoginInput>({ resolver: zodResolver(loginSchema) })

    function onSubmit(data: LoginInput) {
        const user = authenticateUser(data.email, data.password)
        if (user) {
        dispatch(loginSuccess(user))
        return navigate("/mfa")
        } else {
        setAuthError("Invalid email or password")
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center p-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                </CardHeader>
                <CardContent>
                    {authError && (
                        <Alert variant="destructive" className="mb-4">
                            <AlertDescription>{authError}</AlertDescription>
                        </Alert>
                    )}

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                {...register("email")}
                            />
                            {errors.email && (
                                <p className="text-sm text-destructive">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                {...register("password")}
                            />
                            {errors.password && (
                                <p className="text-sm text-destructive">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        <Button type="submit" className="w-full">
                            Login
                        </Button>

                        <div className="text-center text-sm">
                            Don't have an account?{" "}
                            <button
                                type="button"
                                onClick={() => navigate("/signup")}
                                className="underline"
                            >
                                Sign up
                            </button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}