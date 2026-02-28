# Job Tracker Application - Integration Guide

## Overview
This guide explains how the frontend and backend have been integrated for the Job Tracker application.

## Authentication Flow

### Registration Process
1. User fills out the registration form with:
   - Full Name
   - Email
   - Password
   - Confirm Password
2. Frontend validates that passwords match and are at least 6 characters
3. API call is made to `POST /api/users/register`
4. User receives success message and OTP verification modal appears
5. User enters the 6-digit verification code
6. API call is made to `POST /api/users/verify-email`
7. Upon successful verification, user is redirected to login tab

### Login Process
1. User enters email and password
2. API call is made to `POST /api/users/login`
3. Upon successful login, JWT token is stored in localStorage
4. User is redirected to appropriate dashboard based on role:
   - ADMIN → `/admin`
   - JOB_POSTER → `/job-poster`
   - CANDIDATE → `/job-seeker`

### Password Reset Process
1. User enters email in forgot password tab
2. API call is made to `POST /api/users/forgot-password`
3. User receives success message about recovery link

## API Endpoints

### Authentication
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - User login
- `POST /api/users/verify-email` - Verify email with OTP
- `POST /api/users/request-email-verification` - Resend verification code
- `POST /api/users/forgot-password` - Request password reset
- `POST /api/users/reset-password` - Reset password with token
- `GET /api/users/me` - Get current user info

### User Management
- `GET /api/users` - Get all users (admin only)
- `GET /api/users/{id}` - Get user by ID
- `PATCH /api/users/me/profile` - Update user profile
- `PATCH /api/users/me/password` - Change password

## Frontend Configuration

### Environment Variables
Create a `.env` file in the client directory:
```
VITE_API_URL=http://localhost:8080/api
```

### Key Files
- `src/services/authService.ts` - Authentication API service
- `src/pages/Auth.tsx` - Authentication page with login/signup/forgot forms
- `src/routes.tsx` - Application routing
- `src/vite-env.d.ts` - TypeScript environment definitions

## Backend Configuration

### DTOs
- `RegisterRequest.java` - User registration data (name, email, password, role)
- `LoginRequest.java` - User login data (email, password)
- `LoginResponse.java` - Login response (token, user info)
- `UserResponse.java` - User profile response

### Security
- JWT-based authentication
- Role-based access control (ADMIN, JOB_POSTER, CANDIDATE)
- Email verification required for account activation

## Running the Application

### Backend (Spring Boot)
```bash
cd app/server
./mvnw spring-boot:run
```
The backend will run on `http://localhost:8080`

### Frontend (React + Vite)
```bash
cd app/client
npm install
npm run dev
```
The frontend will run on `http://localhost:5173`

## Testing the Integration

### Test Registration
1. Navigate to `http://localhost:5173/auth`
2. Click "Sign Up" tab
3. Fill in all fields including confirm password
4. Submit form - should see success message
5. Enter OTP code (check backend logs for the code)
6. Verify email - should be redirected to login

### Test Login
1. Navigate to `http://localhost:5173/auth`
2. Enter registered email and password
3. Submit form - should be redirected to appropriate dashboard

### Test Password Reset
1. Navigate to `http://localhost:5173/auth`
2. Click "Reset" tab
3. Enter email
4. Submit form - should see success message

## Error Handling
- Frontend displays user-friendly error messages
- API errors are properly caught and displayed
- Form validation prevents invalid submissions
- Loading states provide feedback during API calls

## Security Features
- Password confirmation during registration
- Email verification for account activation
- JWT token-based authentication
- Role-based access control
- Input validation and sanitization

## Next Steps
1. Configure email service for real OTP sending
2. Add social login integration
3. Implement rate limiting for auth endpoints
4. Add password strength requirements
5. Set up session management and auto-refresh
