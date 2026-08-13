import { generateOtp } from '@/lib/mock-auth'
import type { MockUser } from '@/lib/mock-users'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
export interface AuthState {
    status: "unauthenticated" | "Awaiting MFA" | "authenticated"
    user: MockUser | null
    pendingUser: MockUser | null
    otp: string | null
}

export const initialState: AuthState = {
    status: "unauthenticated",
    user: null,
    pendingUser: null,
    otp: null,
}

export const authSlice = createSlice({
    initialState,

    name: "auth",
    // Populating the payload with MockUser type data and feeding that payload to pendingUser
    // Pending user is user yet to be authenticated from otp
    reducers: {
        loginSuccess: (state, action: PayloadAction<MockUser>) => {
            state.pendingUser = action.payload
            state.otp = generateOtp()
            state.status = "Awaiting MFA"
        },
    // No payload needed, handled in reducer before
        verifiedMfaSuccess: (state) => {
            state.user = state.pendingUser
            state.pendingUser = null
            state.otp = null
            state.status = "authenticated"
        },
        resendOtp: (state) => {
            state.otp = generateOtp()
        },
        logout: (state) => {
            state.user = null
            state.status = "unauthenticated"
            state.pendingUser = null
            state.otp = null
        },
    },
});
export const { loginSuccess, verifiedMfaSuccess, resendOtp, logout } = authSlice.actions
export default authSlice.reducer
