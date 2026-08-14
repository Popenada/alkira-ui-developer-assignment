import { describe, it, expect } from 'vitest'
import { loginSchema, otpSchema, signUpSchema } from './validation'

describe('loginSchema', () => {
    it('accepts a valid email and password', () => {
        const result = loginSchema.safeParse({ email: 'test@example.com', password: 'password123' })
        expect(result.success).toBe(true)
    })
    it('rejects an invalid email format', () => {
        const result = loginSchema.safeParse({ email: 'not-an-email', password: 'password123' })
        expect(result.success).toBe(false)
    })
    it('rejects an empty password', () => {
        const result = loginSchema.safeParse({ email: 'test@example.com', password: ''})
        expect(result.success).toBe(false)
    })
})

describe('signupSchema', () => {
    it('accepts a valid email and password', () => {
        const result = signUpSchema.safeParse({ name: 'User', email: 'test@gmail.com', password: 'password123', confirmPassword: 'password123'})
        expect(result.success).toBe(true)
    })
    it('rejects an invalid email format', () => {
        const result = signUpSchema.safeParse({ name: 'User', email: 'test-123', password: 'password123', confirmPassword: 'password123'})
        expect(result.success).toBe(false)
    })
    it('rejects an empty password', () => {
        const result = signUpSchema.safeParse({ name: 'User', email: 'testing-123@gmail.com', password: '', confirmPassword: ''})
        expect(result.success).toBe(false)
    })
    it('rejects non-matching passwords', () => {
        const result = signUpSchema.safeParse({ name: 'User', email: 'testing-123@gmail.com', password: 'password123', confirmPassword: 'password1234'})
        expect(result.success).toBe(false)
    })
    it('rejects an empty name', () => {
        const result = signUpSchema.safeParse({ name: '', email: 'testing@gmail.com', password: 'password123', confirmPassword: 'password123'})
        expect(result.success).toBe(false)
    })
})

describe('otpSchema', () =>{
    it('accepts a valid 6-char code', () => {
        const result = otpSchema.safeParse({ code: '123456' })
        expect(result.success).toBe(true)
    })
    it('rejects a code thats the wrong length', () => {
        const result = otpSchema.safeParse({ code: '123' })
        expect(result.success).toBe(false)
    })
})