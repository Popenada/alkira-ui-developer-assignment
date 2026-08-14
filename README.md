# Alkira UI Development Assignment

## Live Demo

_TODO: add link/recording._

## Features
- **Signup** — user signs up with name, email, and password (UI-only, see [Known Limitations](#known-limitations))
- **Login** — user logs in with email and password
- **MFA** — user completes a second verification step with a randomly generated OTP before reaching the dashboard

## Technologies Used
- React 19
- TypeScript
- Vite
- Redux Toolkit + react-redux
- React Router
- react-hook-form + zod
- shadcn/ui
- Vitest + React Testing Library

## Setup/Install
```
npm install
```

## Local Run
```
npm run dev      # start the dev server
npm run build    # production build
npm run test     # run the test suite once
npm run lint     # lint the project
```

## Mock User Credentials / Roles
Pulled directly from the mock user list (`src/lib/mock-users.ts`) - each entry maps an email/password pair to a role.

| Role | Email | Password |
|---|---|---|
| Read-write (admin) | `admin123@gmail.com` | `admin123` |
| Read-only (user) | `user123@gmail.com` | `user123` |

## How to Test the Login + MFA Flow
1. Log in with either set of mock credentials above, you're taken to the MFA page.
2. A demo OTP is generated and shown on-screen (no real email/SMS backend exists to send it elsewhere).
3. Enter the code shown and you're taken to the dashboard.
4. The dashboard reflects the role of whichever mock user you logged in as (see below).

### Login Validation
- Wrong password (correct email) -> "Invalid email or password."
- Malformed email → "Enter a valid email address."
- Empty password → "Password is required."

### MFA Validation
- Entering any code other than the one shown on-screen -> "Incorrect code, please try again."

### Dashboard / Access Control
- Logged in as the read-write (admin) user -> Edit buttons are enabled.
- Logged in as the read-only user -> Edit buttons are disabled.

## Key Design Decisions and Assumptions

**Redux Toolkit over React Context** — a plain Context + `useReducer` would have been sufficient for a single slice of state this size, and is arguably simpler to set up. Redux Toolkit was used instead because it was a job-description requirement for this assignment (confirmed by `@reduxjs/toolkit`/`react-redux` already being present in the starter project).

**MFA code shown on-screen** — displayed directly in the UI rather than documented in this README, since there's no real email/SMS backend to actually deliver it. This keeps the flow self-explanatory for anyone testing it live, without needing to read documentation first.

**Signup is UI-only** — validates input shape (via zod) but performs no real account creation, and doesn't check for duplicate emails against `MOCK_USERS`. This matches the spec ("full registration is not required"); you still need one of the seeded mock credentials above to actually log in.

**Auth state is in-memory only** — no `localStorage`/persistence. Simpler to implement and reason about, and sufficient for this assignment's scope (see [Known Limitations](#known-limitations) for the trade-off this creates).

**react-hook-form + zod on Login/Signup, plain `useState` on the MFA code field** — Login and Signup each have multiple fields that need independent validation rules and error messages, which is exactly what a schema-driven form library is for. The MFA page has exactly one field, and its input (`InputOTP`) isn't a plain `<input>` — wiring it into react-hook-form would require an extra abstraction (`Controller`) just to save one `useState` call. The simpler tool was used where the simpler tool was actually simpler.

## Known Limitations
1. Refreshing the page mid-session logs you out, auth state is in-memory only, with no persistence.
2. Signup doesn't create real accounts or check for duplicate emails, there's no backend, only mock data.
3. Dashboard actions aren't functional, clicking (or not being able to click) "Edit" only demonstrates the role-based permission system, it doesn't actually edit anything.
