import { authenticateUser, generateOtp } from "./mock-auth";
import { describe, it, expect } from 'vitest'
import { MOCK_USERS } from "./mock-users";
// Testing logic from authenticating users, not for all user hits
describe('authenticateUser', () => {
    it('returns matching user from mock user credentials', () => {
        const user = MOCK_USERS[0]
        const result = authenticateUser(user.email, user.password)
        expect(result).toEqual(user)
    })
    it('returns undefined when password is wrong but correct email', () => {
        const user = MOCK_USERS[0]
        const result = authenticateUser(user.email, '123')
        expect(result).toBeUndefined()
    })
    it('returns undefined when email does not exist', () => {
        const user = MOCK_USERS[0]
        const result = authenticateUser('wrongemail@gmail.com', user.password)
        expect(result).toBeUndefined()
    })
    it('returns matching user from different cased email', () => {
        const user = MOCK_USERS[0]
        const result = authenticateUser(user.email.toUpperCase(), user.password)
        expect(result).toEqual(user)
    })

})
describe('generateOtp', () => {
    it('returns a 6-character string', () => {
        const otp = generateOtp()
        expect(otp).toHaveLength(6)
    })
    it('returns only digits', () => {
        const otp = generateOtp()
        expect(otp).toMatch(/^\d{6}$/)
    })
})