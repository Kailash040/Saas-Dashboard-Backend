# SaaS Dashboard Backend API Documentation

## Base URL
```
http://localhost:3000
```

## Authentication
Most endpoints require authentication. Include the JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## Endpoints

### Health Check
- **GET** `/health`
- **Description**: Basic health check endpoint
- **Response**:
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "version": "1.0.0",
  "environment": "development"
}
```

### Authentication

#### Register User
- **POST** `/api/v1/auth/register`
- **Description**: Register a new user
- **Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123",
  "company": "Example Corp"
}
```
- **Response**:
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "company": "Example Corp"
    },
    "token": "jwt_token_here"
  }
}
```

#### Login User
- **POST** `/api/v1/auth/login`
- **Description**: Authenticate user and get token
- **Body**:
```json
{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```
- **Response**:
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "company": "Example Corp"
    },
    "token": "jwt_token_here"
  }
}
```

#### Logout User
- **POST** `/api/v1/auth/logout`
- **Description**: Logout user (requires authentication)
- **Headers**: `Authorization: Bearer <token>`
- **Response**:
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

### User Management

#### Get User Profile
- **GET** `/api/v1/users/profile`
- **Description**: Get current user's profile
- **Headers**: `Authorization: Bearer <token>`
- **Response**:
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "company": "Example Corp",
      "role": "user",
      "isActive": true
    }
  }
}
```

#### Update User Profile
- **PUT** `/api/v1/users/profile`
- **Description**: Update current user's profile
- **Headers**: `Authorization: Bearer <token>`
- **Body**:
```json
{
  "name": "John Updated",
  "phone": "+1234567890",
  "avatar": "https://example.com/avatar.jpg"
}
```
- **Response**:
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "user": {
      "id": "user_id",
      "name": "John Updated",
      "email": "john@example.com",
      "phone": "+1234567890",
      "avatar": "https://example.com/avatar.jpg"
    }
  }
}
```

### API Status

#### Get API Status
- **GET** `/api/v1/status`
- **Description**: Get server status and metrics
- **Response**:
```json
{
  "status": "running",
  "uptime": 123.456,
  "memory": {
    "rss": "45MB",
    "heapTotal": "20MB",
    "heapUsed": "15MB"
  },
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

#### Get API Version
- **GET** `/api/v1/version`
- **Description**: Get API version information
- **Response**:
```json
{
  "version": "1.0.0",
  "apiVersion": "v1",
  "features": [
    "authentication",
    "user-management",
    "multi-tenancy",
    "subscription-management"
  ]
}
```

## Error Responses

All endpoints return consistent error responses:

```json
{
  "success": false,
  "message": "Error description",
  "errors": [
    {
      "field": "email",
      "message": "Please provide a valid email address",
      "value": "invalid-email"
    }
  ]
}
```

## Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

## Rate Limiting

- Authentication endpoints: 5 requests per 15 minutes
- API endpoints: 100 requests per 15 minutes
- Rate limit headers are included in responses

## Environment Variables

Make sure to set these environment variables:

```env
NODE_ENV=development
PORT=3000
DATABASE_URL=mongodb://localhost:27017/saas-dashboard
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:3000
``` 