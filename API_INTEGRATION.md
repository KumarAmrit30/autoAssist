# Backend API Integration Guide

This document explains how to connect your deployed backend with this frontend application.

## 🔧 Setup Instructions

### 1. Configure Backend URL

Update the API base URL in `src/config/api.ts`:

```typescript
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000",
  // ...
};
```

### 2. Set Environment Variables

Create a `.env` file in the project root:

```bash
# Production backend URL (replace with your actual deployed URL)
VITE_API_BASE_URL=https://your-backend-domain.com

# For local development
# VITE_API_BASE_URL=http://localhost:3000
```

**Important:** Replace `https://your-backend-domain.com` with your actual deployed backend URL.

### 3. Update Backend CORS Settings

Ensure your backend accepts requests from your frontend domain. Add CORS configuration:

```javascript
// Express.js example
const cors = require("cors");

app.use(
  cors({
    origin: [
      "http://localhost:5173", // Local development
      "https://your-frontend-domain.com", // Production frontend
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);
```

## 🛠 API Endpoints Required

Your backend should implement these endpoints:

### Cars API

- `GET /api/cars` - Get all cars with optional search/filters
- `GET /api/cars/:id` - Get car by ID
- `GET /api/cars/search?query=` - Search cars
- `GET /api/cars/brands` - Get popular brands (optional)
- `GET /api/cars/fuel-types` - Get fuel types (optional)
- `GET /api/cars/:id/reviews` - Get car reviews
- `POST /api/cars/:id/reviews` - Add car review

### Authentication API

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/google` - Google OAuth
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - User logout

### Contact API

- `POST /api/contact` - Submit contact form

## 📄 Expected Data Formats

### Car Object

```typescript
interface Car {
  id: string;
  name: string;
  brand: string;
  price: string;
  rating: number;
  fuelType: string;
  transmission: string;
  seating: number;
  mileage: string;
  features: string[];
  images: string[];
  // Optional fields
  description?: string;
  specifications?: {
    engine?: string;
    power?: string;
    // ... more specs
  };
}
```

### Cars List Response

```typescript
interface CarSearchResponse {
  cars: Car[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
```

### Authentication Response

```typescript
interface AuthResponse {
  user: {
    id: string;
    name: string;
    email: string;
    picture?: string;
  };
  token: string;
  message: string;
}
```

### Contact Response

```typescript
interface ContactResponse {
  success: boolean;
  message: string;
  id?: string;
}
```

## 🎯 Frontend Features Implemented

### ✅ Cars Integration

- Car listing with search and filters
- Car details page
- Pagination support
- Loading states and error handling
- Fallback to static data if API fails

### ✅ Authentication

- Google OAuth integration
- JWT token storage
- Automatic token attachment to requests
- User session management

### ✅ Contact Form

- Form submission to backend
- Loading states
- Success/error notifications
- Form validation

## 🚀 Testing the Integration

1. **Start your backend server**
2. **Update the `VITE_API_BASE_URL` in your `.env` file**
3. **Run the frontend:**
   ```bash
   npm run dev
   ```
4. **Test each feature:**
   - Browse cars on the home page
   - View car details
   - Submit the contact form
   - Try authentication (if implemented in backend)

## 🔍 Debugging

### Check Network Tab

- Open browser DevTools → Network tab
- Look for API requests to your backend
- Check for CORS errors or 404/500 responses

### Common Issues

1. **CORS Errors**

   - Solution: Configure CORS on your backend

2. **404 Errors**

   - Solution: Ensure your backend routes match the expected endpoints

3. **Loading Static Data Instead of API**
   - The frontend has fallback logic to use static data if API fails
   - Check console for error messages

### Environment Variables

The frontend will use these environment variables:

- `VITE_API_BASE_URL` - Your backend URL
- Falls back to `http://localhost:3000` if not set

## 📝 Deployment Notes

### Frontend Deployment

When deploying your frontend, make sure to:

1. Set the production `VITE_API_BASE_URL` environment variable
2. Build the project: `npm run build`
3. Deploy the `dist` folder

### Backend Deployment

Make sure your backend:

1. Is accessible from the internet
2. Has CORS configured for your frontend domain
3. Returns the expected data formats
4. Handles authentication properly

## 🔄 Fallback Behavior

The frontend is designed to be resilient:

- If API calls fail, it falls back to static car data
- Loading states are shown during API requests
- Error messages are displayed when requests fail
- Users can still browse cars even if the backend is down

This ensures a good user experience even during backend issues.
