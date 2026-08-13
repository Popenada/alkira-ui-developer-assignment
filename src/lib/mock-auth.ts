import { MOCK_USERS } from "./mock-users"

// User includes one object element of MOCK_USERS Array
// Normalized email to take all cases of string
export function authenticateUser(email: string, password: string){
    return MOCK_USERS.find((user) => user.password === password && user.email.toLowerCase() === email.toLowerCase())
}
// Formula for generating range of random number between 100000 and 999999 for 6 digit numerical code
export function generateOtp(){
    return Math.floor(100000 + Math.random() * 900000).toString()
}