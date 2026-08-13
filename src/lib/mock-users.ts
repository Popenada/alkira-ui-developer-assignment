export type Role = "read-only" | "read-write"


export interface MockUser {
    email: string
    password: string
    name: string
    role: Role
}

export const MOCK_USERS: MockUser[] = [
    { email: "user123@gmail.com", password: "user123", name: "User", role: "read-only"},
    { email: "admin123@gmail.com", password: "admin123", name: "Admin", role: "read-write"}
]
