import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { MemoryRouter } from 'react-router-dom'
import { DashboardPage } from './DashboardPage'
import authReducer, { type AuthState } from '@/features/auth/authSlice'
import type { MockUser } from '@/lib/mock-users'
import type { Role } from '@/lib/mock-users'

function renderDashboard(role: Role) {
    const testUser: MockUser = { email: 'test@example.com', password: 'pw', name: 'Test User', role }
    const store = configureStore({
        reducer: { auth: authReducer },
        preloadedState: {
            auth: { status: 'authenticated', user: testUser, pendingUser: null, otp: null } satisfies AuthState,
        },
    })
    render(
        <Provider store={store}>
            <MemoryRouter>
                <DashboardPage />
            </MemoryRouter>
        </Provider>
    )
}
describe('DashboardPage', () => {
    it('disables Edit buttons for read-only users', () => {
        renderDashboard('read-only')
        const editButtons = screen.getAllByRole('button', { name: /edit/i})
        editButtons.forEach((button) => expect(button).toBeDisabled())
    })

     it('enables Edit buttons for read-write users', () => {
        renderDashboard('read-write')
        const editButtons = screen.getAllByRole('button', { name: /edit/i })
        editButtons.forEach((button) => expect(button).not.toBeDisabled())
    })
})