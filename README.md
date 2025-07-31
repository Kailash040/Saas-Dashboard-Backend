# SaaS Dashboard Backend

A comprehensive Express.js backend application for building scalable SaaS (Software as a Service) applications with modern API architecture.

## Features

- ✅ **RESTful API Architecture** - Clean, scalable API design
- ✅ **Multi-tenant Support** - Built for SaaS applications
- ✅ **Authentication & Authorization** - Secure user management
- ✅ **Database Integration Ready** - MongoDB/PostgreSQL support
- ✅ **API Documentation** - Auto-generated API docs
- ✅ **Error Handling** - Comprehensive error management
- ✅ **Middleware Support** - Extensible middleware architecture
- ✅ **Development Tools** - Hot reload with nodemon
- ✅ **Production Ready** - Optimized for deployment
- ✅ **Testing Framework** - Unit and integration testing setup

## Quick Start

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn
- MongoDB or PostgreSQL (for production)
- Redis (optional, for caching)

### Installation

1. Clone or download this project
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

#### Development Mode (with auto-reload)
```bash
npm run dev
```

#### Production Mode
```bash
npm start
```

The server will start on `http://localhost:3000`

## Architecture

This SaaS backend follows a modular architecture:

```
├── app.js              # Main application entry point
├── config/             # Configuration files
├── routes/             # API route definitions
├── controllers/        # Business logic controllers
├── models/             # Data models
├── middleware/         # Custom middleware
├── utils/              # Utility functions
├── tests/              # Test files
└── docs/               # API documentation
```

## API Endpoints

### Core API Routes

#### GET `/api/v1/health`
Health check endpoint for monitoring.

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "version": "1.0.0"
}
```

#### GET `/api/v1/status`
Server status and metrics.

**Response:**
```json
{
  "status": "running",
  "uptime": 123.456,
  "memory": "45.2MB",
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

### Authentication Endpoints

#### POST `/api/v1/auth/register`
User registration endpoint.

#### POST `/api/v1/auth/login`
User authentication endpoint.

#### POST `/api/v1/auth/logout`
User logout endpoint.

### User Management

#### GET `/api/v1/users/profile`
Get user profile information.

#### PUT `/api/v1/users/profile`
Update user profile.

### SaaS Features

#### GET `/api/v1/tenants`
Get tenant information (multi-tenant support).

#### GET `/api/v1/subscriptions`
Get subscription details.

#### POST `/api/v1/webhooks`
Handle webhook events.

## Project Structure

```
├── app.js              # Main application entry point
├── package.json        # Project dependencies and scripts
├── README.md           # This file
├── .gitignore          # Git ignore rules
├── config/             # Configuration files
│   ├── database.js     # Database configuration
│   └── environment.js  # Environment variables
├── routes/             # API route definitions
│   ├── auth.js         # Authentication routes
│   ├── users.js        # User management routes
│   └── api.js          # Core API routes
├── controllers/        # Business logic controllers
│   ├── authController.js
│   └── userController.js
├── models/             # Data models
│   ├── User.js
│   └── Tenant.js
├── middleware/         # Custom middleware
│   ├── auth.js         # Authentication middleware
│   └── validation.js   # Request validation
├── utils/              # Utility functions
├── tests/              # Test files
└── docs/               # API documentation
```

## Scripts

- `npm start` - Start the production server
- `npm run dev` - Start the development server with nodemon
- `npm test` - Run unit and integration tests
- `npm run test:watch` - Run tests in watch mode
- `npm run lint` - Run ESLint for code quality
- `npm run build` - Build for production
- `npm run migrate` - Run database migrations

## Environment Variables

- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment (development/production)
- `DATABASE_URL` - Database connection string
- `JWT_SECRET` - JWT token secret key
- `REDIS_URL` - Redis connection string (optional)
- `STRIPE_SECRET_KEY` - Stripe payment integration
- `SENDGRID_API_KEY` - Email service API key

## Development

This SaaS backend uses modern technologies:

- **Express.js** - Fast, unopinionated web framework
- **JWT** - JSON Web Tokens for authentication
- **MongoDB/PostgreSQL** - Database solutions
- **Redis** - Caching and session storage
- **Stripe** - Payment processing
- **SendGrid** - Email service
- **Nodemon** - Development tool for auto-reloading
- **Jest** - Testing framework
- **ESLint** - Code quality and linting

## SaaS Features

- **Multi-tenancy** - Support for multiple organizations
- **Subscription Management** - Billing and subscription handling
- **User Management** - Complete user lifecycle
- **API Rate Limiting** - Protect your APIs
- **Webhook Support** - Real-time integrations
- **Analytics Ready** - Built-in analytics hooks

## License

MIT 