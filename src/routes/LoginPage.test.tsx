import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { MemoryRouter } from 'react-router-dom'
import { LoginPage } from './LoginPage'
import authReducer from '@/features/auth/authSlice'

function renderLogin() {
    const store = configureStore({ reducer: { auth: authReducer } })
    render(
        <Provider store={store}>
            <MemoryRouter>
                <LoginPage />
            </MemoryRouter>
        </Provider>
    )
}

describe('LoginPage', () => {
    it('shows an error for the wrong password', async () => {
        const user = userEvent.setup()
        renderLogin()

        await user.type(screen.getByLabelText(/email/i), 'admin123@gmail.com')
        await user.type(screen.getByLabelText(/password/i), 'wrong-password')
        await user.click(screen.getByRole('button', { name: /login/i }))

        expect(await screen.findByText(/invalid email or password/i)).toBeInTheDocument()
    })
})
