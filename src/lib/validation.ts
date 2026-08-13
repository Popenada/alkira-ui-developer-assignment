import { z } from "zod"

export const loginSchema = z.object({
    email: z.string().email("Must enter a valid email address"),
    password: z.string().min(1, "Must enter a valid password"),
})

export const signUpSchema = z.object({
    name: z.string().min(1, "Name is required"),

    email: z.string().email("Must enter a valid email address"),

    password: z.string().min(1, "Password is required"),

    confirmPassword: z.string().min(1, "Must confirm password"),
    
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match", 
    path: ["confirmPassword"]
})

// OTP schema only detecting length of code and not detecting digit validation
export const otpSchema = z.object({
    code: z.string().length(6, "Code must be 6 characters")
})