import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '@/app/hooks'
import { resendOtp, verifiedMfaSuccess } from '@/features/auth/authSlice'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'

export function MfaPage() {
    const status = useAppSelector((state) => state.auth.status)
    const otp = useAppSelector((state) => state.auth.otp)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [code, setCode] = useState('')
    const [error, setError] = useState<string | null>(null)

    if (status !== 'Awaiting MFA') {
        return <Navigate to="/login" replace />
    }

    function handleVerify() {
        if (code === otp) {
            dispatch(verifiedMfaSuccess())
            navigate('/dashboard')
        } else {
            setError('Incorrect code, please try again')
        }
    }

    function handleResend() {
        dispatch(resendOtp())
        // Resets any prior state by setting code to nothing
        setCode('')
        setError(null)
    }
    

    return (
        <div className="flex min-h-screen items-center justify-center p-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Verify your identity</CardTitle>
                    <p className="text-sm text-muted-foreground">
                        Enter the 6-digit verification code.
                    </p>
                </CardHeader>

                <CardContent className="space-y-4">
                    {error && (
                        <Alert variant="destructive">
                            <AlertDescription>
                                {error}
                            </AlertDescription>
                        </Alert>
                    )}

                    <div className="flex justify-center">
                        <InputOTP
                            maxLength={6}
                            value={code}
                            onChange={(value) => {
                                setCode(value)
                                setError(null)
                            }}
                        >
                            <InputOTPGroup>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                                <InputOTPSlot index={3} />
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                            </InputOTPGroup>
                        </InputOTP>
                    </div>

                    <Button
                        className="w-full"
                        onClick={handleVerify}
                        disabled={code.length !== 6}
                    >
                        Verify
                    </Button>

                    <div className="text-center text-sm">
                        Didn't receive a code?{" "}
                        <button
                            type="button"
                            onClick={handleResend}
                            className="underline"
                        >
                            Resend code
                        </button>
                    </div>

                    <p className="text-center text-xs text-muted-foreground">
                        Demo code: {otp}
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}
