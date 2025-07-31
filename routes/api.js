const express = require('express');
const router = express.Router();

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development'
  });
});

// Server status endpoint
router.get('/status', (req, res) => {
  const memUsage = process.memoryUsage();
  res.json({
    status: 'running',
    uptime: process.uptime(),
    memory: {
      rss: `${Math.round(memUsage.rss / 1024 / 1024)}MB`,
      heapTotal: `${Math.round(memUsage.heapTotal / 1024 / 1024)}MB`,
      heapUsed: `${Math.round(memUsage.heapUsed / 1024 / 1024)}MB`
    },
    timestamp: new Date().toISOString()
  });
});

// API version info
router.get('/version', (req, res) => {
  res.json({
    version: '1.0.0',
    apiVersion: 'v1',
    features: [
      'authentication',
      'user-management',
      'multi-tenancy',
      'subscription-management'
    ]
  });
});

module.exports = router; 