import { describe, it, expect } from 'vitest'
import authReducer, { loginSuccess, verifiedMfaSuccess, logout, initialState } from './authSlice'
import type { MockUser } from '@/lib/mock-users'

const testUser: MockUser = {
    email: 'test@example.com',
    password: 'password123',
    name: 'Test User',
    role: 'read-write',
}

describe('authSlice', () => {
    it('loginSuccess moves to Awaiting MFA and sets pendingUser', () => {
        const state = authReducer(initialState, loginSuccess(testUser))
        expect(state.status).toBe('Awaiting MFA')
        expect(state.user).toBeNull()
        expect(state.pendingUser).toEqual(testUser)
        expect(state.otp).toHaveLength(6)
    })
    it('verifiedMfaSuccess moves to authenticated and sets user', () => {
        const afterLogin = authReducer(initialState, loginSuccess(testUser))
        const state = authReducer(afterLogin, verifiedMfaSuccess())
        expect(state.status).toBe('authenticated')
        expect(state.pendingUser).toBeNull()
        expect(state.user).toEqual(testUser)
        expect(state.otp).toBeNull()
    })
    it('logout resets to initial state', () => {
        const afterLogin = authReducer(initialState, loginSuccess(testUser))
        const afterMfa = authReducer(afterLogin, verifiedMfaSuccess())
        const state = authReducer(afterMfa, logout())
        expect(state).toEqual(initialState)
    })
})
