// server.js - Local development server
const app = require('./index');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`
📝 Available Endpoints:
  
  Authentication Routes:
    POST   http://localhost:${PORT}/api/auth/login     - Login with email & password
    POST   http://localhost:${PORT}/api/auth/register  - Register new user
    GET    http://localhost:${PORT}/api/auth/verify    - Verify JWT token

  Protected Routes (require Authorization header with JWT token):
    GET    http://localhost:${PORT}/api/protected/     - Get all users (protected)
    GET    http://localhost:${PORT}/api/protected/me   - Get current user info

  Public Routes:
    GET    http://localhost:${PORT}/hello              - Test endpoint
    GET    http://localhost:${PORT}/api/noAuth/        - Get users without auth

📌 Example Usage:
  1. Register: POST to /api/auth/register
     Body: { "name": "John Doe", "email": "john@example.com", "password": "password123", "role": "Admin" }
  
  2. Login: POST to /api/auth/login
     Body: { "email": "john@example.com", "password": "password123" }
  
  3. Access Protected Route: GET to /api/protected/
     Header: Authorization: Bearer <token_from_login>
  `);
});
