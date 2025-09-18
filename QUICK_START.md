# 🚀 Quick Start: Connect Backend to Frontend

## Step 1: Get Your Backend URL

Find your deployed backend URL from:

- Heroku: `https://your-app-name.herokuapp.com`
- Vercel: `https://your-project.vercel.app`
- Railway: `https://your-app.railway.app`
- Your own domain: `https://api.yourdomain.com`

## Step 2: Set Environment Variable

Create a `.env` file in your project root:

```bash
VITE_API_BASE_URL=https://your-backend-url-here.com
```

**Example:**

```bash
VITE_API_BASE_URL=https://autoassist-backend.herokuapp.com
```

## Step 3: Test the Connection

1. Start your frontend:

   ```bash
   npm run dev
   ```

2. Open `http://localhost:5173` and check:
   - Cars load on the home page
   - Car details work when clicking a car
   - Contact form submits successfully
   - Check browser console for any errors

## Step 4: Deploy Frontend

When deploying your frontend (Vercel, Netlify, etc.), set the environment variable:

**Vercel:**

- Go to Project Settings → Environment Variables
- Add: `VITE_API_BASE_URL` = `your-backend-url`

**Netlify:**

- Go to Site Settings → Environment Variables
- Add: `VITE_API_BASE_URL` = `your-backend-url`

## 🔧 Backend Requirements

Your backend needs these endpoints:

### Required:

- `GET /api/cars` - Returns list of cars
- `GET /api/cars/:id` - Returns single car
- `POST /api/contact` - Handles contact form

### Optional (will fallback to static data):

- `GET /api/cars/brands` - Popular brands
- `GET /api/cars/fuel-types` - Fuel types
- Authentication endpoints

### Example Cars Response:

```json
{
  "cars": [
    {
      "id": "1",
      "name": "Creta",
      "brand": "Hyundai",
      "price": "11.00 - 20.15 lakh",
      "rating": 4.5,
      "fuelType": "Petrol",
      "transmission": "Manual",
      "seating": 5,
      "mileage": "17.4 kmpl",
      "features": ["Sunroof", "Wireless Charging"],
      "images": ["/path/to/image.jpg"]
    }
  ],
  "total": 1,
  "page": 1,
  "limit": 10,
  "totalPages": 1
}
```

## ✅ Success Indicators

- No CORS errors in browser console
- Cars display on home page (not just static data)
- Search functionality works
- Car details load when clicking a car
- Contact form shows success message

## 🆘 Troubleshooting

**CORS Error?**
Add to your backend:

```javascript
app.use(
  cors({
    origin: ["http://localhost:5173", "https://your-frontend-domain.com"],
  })
);
```

**404 Errors?**
Check your backend routes match: `/api/cars`, `/api/cars/:id`, `/api/contact`

**Still showing static data?**
Open browser DevTools → Network tab, look for failed API requests

---

That's it! Your frontend will now connect to your deployed backend. 🎉
