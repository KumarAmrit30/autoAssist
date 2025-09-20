// Frontend Environment Configuration
export const FRONTEND_CONFIG = {
  // API Configuration
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000",

  // Frontend URL
  FRONTEND_URL: import.meta.env.VITE_FRONTEND_URL || "http://localhost:8081",

  // Environment
  NODE_ENV: import.meta.env.MODE || "development",

  // API Endpoints
  ENDPOINTS: {
    CARS: "/api/cars",
    CAR_BY_ID: (id: string) => `/api/cars/${id}`,
    SEARCH_CARS: "/api/cars/search",
    HEALTH: "/health",
  },
};

// Helper function to get full API URL
export const getApiUrl = (endpoint: string): string => {
  return `${FRONTEND_CONFIG.API_BASE_URL}${endpoint}`;
};

// Default headers for API requests
export const getDefaultHeaders = (): HeadersInit => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  // Add auth token if available
  const token = localStorage.getItem("auth_token");
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};
