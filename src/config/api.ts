// API Configuration
export const API_CONFIG = {
  // Use environment variable if available, otherwise fallback to localhost for development
  BASE_URL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000",

  // API endpoints
  ENDPOINTS: {
    // Cars
    CARS: "/api/cars",
    CAR_BY_ID: (id: string) => `/api/cars/${id}`,
    SEARCH_CARS: "/api/cars/search",

    // Auth
    AUTH: {
      LOGIN: "/api/auth/login",
      REGISTER: "/api/auth/register",
      LOGOUT: "/api/auth/logout",
      ME: "/api/auth/me",
      GOOGLE: "/api/auth/google",
    },

    // Contact
    CONTACT: "/api/contact",

    // Reviews
    REVIEWS: "/api/reviews",
    CAR_REVIEWS: (carId: string) => `/api/cars/${carId}/reviews`,
  },
};

// Helper function to get full URL
export const getApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
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

// HTTP client wrapper with error handling
export const apiClient = {
  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(getApiUrl(endpoint), {
      method: "GET",
      headers: getDefaultHeaders(),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  },

  async post<T>(endpoint: string, data?: any): Promise<T> {
    const response = await fetch(getApiUrl(endpoint), {
      method: "POST",
      headers: getDefaultHeaders(),
      body: data ? JSON.stringify(data) : undefined,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  },

  async put<T>(endpoint: string, data?: any): Promise<T> {
    const response = await fetch(getApiUrl(endpoint), {
      method: "PUT",
      headers: getDefaultHeaders(),
      body: data ? JSON.stringify(data) : undefined,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  },

  async delete<T>(endpoint: string): Promise<T> {
    const response = await fetch(getApiUrl(endpoint), {
      method: "DELETE",
      headers: getDefaultHeaders(),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  },
};
