const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const connectDB = require('./config/database');
const config = require('./config/environment');
const { errorHandler } = require('./utils/errorHandler');

// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const apiRoutes = require('./routes/api');

const app = express();

// Connect to database
connectDB();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: config.CORS_ORIGIN,
  credentials: true
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Compression middleware
app.use(compression());

// Logging middleware
if (config.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Serve static files
app.use(express.static('public'));

// API Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1', apiRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    environment: config.NODE_ENV
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'SaaS Dashboard Backend API',
    version: '1.0.0',
    documentation: '/api/v1/health',
    status: 'running'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
    message: 'The requested route does not exist'
  });
});

// Error handling middleware
app.use(errorHandler);

// Start the server
const PORT = config.PORT;
app.listen(PORT, () => {
  console.log(`🚀 SaaS Dashboard Backend Server is running on http://localhost:${PORT}`);
  console.log(`📝 Environment: ${config.NODE_ENV}`);
  console.log(`📝 API Documentation:`);
  console.log(`   GET /health - Health check`);
  console.log(`   GET /api/v1/health - API health check`);
  console.log(`   GET /api/v1/status - Server status`);
  console.log(`   POST /api/v1/auth/register - User registration`);
  console.log(`   POST /api/v1/auth/login - User login`);
  console.log(`   GET /api/v1/users/profile - Get user profile`);
}); 