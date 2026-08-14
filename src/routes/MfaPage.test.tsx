import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { MemoryRouter } from 'react-router-dom'
import { MfaPage } from './MfaPage'
import authReducer from '@/features/auth/authSlice'
import type { AuthState } from '@/features/auth/authSlice'
import type { MockUser } from '@/lib/mock-users'
// Preload state to MFA page with otp code 
function renderMfa() {
    const pendingUser: MockUser = { email: 'test@example.com', password: 'pw', name: 'Test', role: 'read-write' }
    const authState = {
        status: 'Awaiting MFA',
        user: null,
        pendingUser,
        otp: '123456',
    } satisfies AuthState

    const store = configureStore({
        reducer: { auth: authReducer },
        preloadedState: { auth: authState },
    })
    render(
        <Provider store={store}>
            <MemoryRouter>
                <MfaPage />
            </MemoryRouter>
        </Provider>
    )
}

describe('MfaPage', () => {
    it('shows an error for an incorrect code', async () => {
        const user = userEvent.setup()
        renderMfa()

        await user.type(screen.getByRole('textbox'), '000000')
        await user.click(screen.getByRole('button', { name: /verify/i }))

        expect(await screen.findByText(/Incorrect code, please try again/i)).toBeInTheDocument()
    })
})
