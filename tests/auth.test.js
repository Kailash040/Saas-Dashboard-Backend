const request = require('supertest');
const app = require('../app');
const User = require('../models/User');

describe('Auth API', () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  describe('POST /api/v1/auth/register', () => {
    it('should register a new user with fullname, email, and password', async () => {
      const userData = {
        fullname: 'John Doe',
        email: 'john@example.com',
        password: 'Password123'
      };

      const response = await request(app)
        .post('/api/v1/auth/register')
        .send(userData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('User registered successfully');
      expect(response.body.data.user).toHaveProperty('id');
      expect(response.body.data.user.fullname).toBe('John Doe');
      expect(response.body.data.user.email).toBe('john@example.com');
      expect(response.body.data).toHaveProperty('token');
    });

    it('should return error for duplicate email', async () => {
      const userData = {
        fullname: 'John Doe',
        email: 'john@example.com',
        password: 'Password123'
      };

      // Register first user
      await request(app)
        .post('/api/v1/auth/register')
        .send(userData);

      // Try to register with same email
      const response = await request(app)
        .post('/api/v1/auth/register')
        .send(userData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('User already exists with this email');
    });

    it('should validate required fields', async () => {
      const response = await request(app)
        .post('/api/v1/auth/register')
        .send({})
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Validation failed');
    });
  });

  describe('POST /api/v1/auth/login', () => {
    beforeEach(async () => {
      // Create a test user
      const userData = {
        fullname: 'Jane Doe',
        email: 'jane@example.com',
        password: 'Password123'
      };

      await request(app)
        .post('/api/v1/auth/register')
        .send(userData);
    });

    it('should login with valid email and password', async () => {
      const loginData = {
        email: 'jane@example.com',
        password: 'Password123'
      };

      const response = await request(app)
        .post('/api/v1/auth/login')
        .send(loginData)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Login successful');
      expect(response.body.data.user).toHaveProperty('id');
      expect(response.body.data.user.fullname).toBe('Jane Doe');
      expect(response.body.data.user.email).toBe('jane@example.com');
      expect(response.body.data).toHaveProperty('token');
    });

    it('should return error for invalid credentials', async () => {
      const loginData = {
        email: 'jane@example.com',
        password: 'wrongpassword'
      };

      const response = await request(app)
        .post('/api/v1/auth/login')
        .send(loginData)
        .expect(401);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Invalid credentials');
    });

    it('should return error for non-existent user', async () => {
      const loginData = {
        email: 'nonexistent@example.com',
        password: 'Password123'
      };

      const response = await request(app)
        .post('/api/v1/auth/login')
        .send(loginData)
        .expect(401);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Invalid credentials');
    });
  });
}); 