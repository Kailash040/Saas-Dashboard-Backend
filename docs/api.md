# API Documentation

## Authentication Endpoints

### Register User
**POST** `/api/v1/auth/register`

Register a new user with the following fields:
- `fullname` (required): User's full name (2-50 characters)
- `email` (required): Valid email address
- `password` (required): Password (minimum 6 characters, must contain uppercase, lowercase, and number)

**Request Body:**
```json
{
  "fullname": "John Doe",
  "email": "john@example.com",
  "password": "Password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "user_id",
      "fullname": "John Doe",
      "email": "john@example.com"
    },
    "token": "jwt_token"
  }
}
```

### Login User
**POST** `/api/v1/auth/login`

Login with email and password:
- `email` (required): User's email address
- `password` (required): User's password

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "Password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "user_id",
      "fullname": "John Doe",
      "email": "john@example.com"
    },
    "token": "jwt_token"
  }
}
```

### Logout User
**POST** `/api/v1/auth/logout`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

### Refresh Token
**POST** `/api/v1/auth/refresh-token`

**Request Body:**
```json
{
  "token": "current_jwt_token"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Token refreshed successfully",
  "data": {
    "token": "new_jwt_token"
  }
}
```

### Forgot Password
**POST** `/api/v1/auth/forgot-password`

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Password reset email sent",
  "data": {
    "resetToken": "reset_token"
  }
}
```

### Reset Password
**POST** `/api/v1/auth/reset-password`

**Request Body:**
```json
{
  "token": "reset_token",
  "newPassword": "NewPassword123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Password reset successfully"
}
```

## User Endpoints

### Get Profile
**GET** `/api/v1/users/profile`

**Headers:** `Authorization: Bearer <token>`

### Update Profile
**PUT** `/api/v1/users/profile`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "fullname": "Updated Name",
  "email": "updated@example.com",
  "company": "Company Name",
  "phone": "+1234567890",
  "avatar": "https://example.com/avatar.jpg"
}
```

### Delete Profile
**DELETE** `/api/v1/users/profile`

**Headers:** `Authorization: Bearer <token>`

## Error Responses

All endpoints return consistent error responses:

```json
{
  "success": false,
  "message": "Error description"
}
```

For validation errors:
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Please provide a valid email address",
      "value": "invalid-email"
    }
  ]
}
``` 