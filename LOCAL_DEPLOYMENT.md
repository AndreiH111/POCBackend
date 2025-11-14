# Local Development Guide

## Installation & Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env.local` file with your configuration:
   ```env
   JWT_SECRET=your-secret-key-change-in-production
   JWT_EXPIRES_IN=24h
   PORT=3000
   NODE_ENV=development
   ```

## Running Locally

Start the development server:
```bash
npm start
# or
npm run dev
```

The server will run on **http://localhost:3000**

## Available Endpoints

### Authentication Routes (Public)
- **Login**: `POST http://localhost:3000/api/auth/login`
  - Body: `{ "email": "keith.meguiso@takeda.com", "password": "password123" }`
  
- **Register**: `POST http://localhost:3000/api/auth/register`
  - Body: `{ "name": "John Doe", "email": "john@example.com", "password": "password123", "role": "Admin" }`
  
- **Verify Token**: `GET http://localhost:3000/api/auth/verify`
  - Header: `Authorization: Bearer <your_jwt_token>`

### Protected Routes (Require JWT Token)
- **Get All Users**: `GET http://localhost:3000/api/protected/`
  - Header: `Authorization: Bearer <your_jwt_token>`
  
- **Get Current User**: `GET http://localhost:3000/api/protected/me`
  - Header: `Authorization: Bearer <your_jwt_token>`

### Public Routes (No Authentication)
- **Hello**: `GET http://localhost:3000/hello`
- **Get Users**: `GET http://localhost:3000/api/noAuth/`

## Example Flow

1. **Login** to get a JWT token:
   ```bash
   curl -X POST http://localhost:3000/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email": "keith.meguiso@takeda.com", "password": "password123"}'
   ```

2. **Copy the token** from the response

3. **Access protected routes** using the token:
   ```bash
   curl -X GET http://localhost:3000/api/protected/ \
     -H "Authorization: Bearer YOUR_TOKEN_HERE"
   ```

## Testing with Postman

1. Open Postman
2. Create a new request
3. Set method to POST and URL to `http://localhost:3000/api/auth/login`
4. Go to Body → Select raw → JSON
5. Enter: `{"email": "keith.meguiso@takeda.com", "password": "password123"}`
6. Send the request
7. Copy the token from response
8. Create a new GET request to `http://localhost:3000/api/protected/`
9. Go to Headers tab
10. Add: `Authorization: Bearer YOUR_TOKEN_HERE`
11. Send the request

## Default Test Credentials

You can use these existing users for testing login:
- Email: `keith.meguiso@takeda.com` | Password: `password123`
- Email: `ma-angela.mejia@takeda.com` | Password: `password123`
- Email: `lee-ann.baranco@takeda.com` | Password: `password123`
