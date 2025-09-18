import { apiClient, API_CONFIG } from "@/config/api";
import {
  User,
  LoginCredentials,
  RegisterData,
  AuthResponse,
  GoogleAuthData,
} from "@/types/auth";

export const authService = {
  // Register with email/password
  async register(data: RegisterData): Promise<AuthResponse> {
    return apiClient.post<AuthResponse>(
      API_CONFIG.ENDPOINTS.AUTH.REGISTER,
      data
    );
  },

  // Login with email/password
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    return apiClient.post<AuthResponse>(
      API_CONFIG.ENDPOINTS.AUTH.LOGIN,
      credentials
    );
  },

  // Google authentication
  async googleAuth(data: GoogleAuthData): Promise<AuthResponse> {
    return apiClient.post<AuthResponse>(API_CONFIG.ENDPOINTS.AUTH.GOOGLE, data);
  },

  // Get current user
  async getCurrentUser(): Promise<User> {
    return apiClient.get<User>(API_CONFIG.ENDPOINTS.AUTH.ME);
  },

  // Logout
  async logout(): Promise<void> {
    try {
      await apiClient.post<void>(API_CONFIG.ENDPOINTS.AUTH.LOGOUT);
    } finally {
      // Always clear local storage, even if API call fails
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user");
    }
  },

  // Save auth data to localStorage
  saveAuthData(response: AuthResponse): void {
    localStorage.setItem("auth_token", response.token);
    localStorage.setItem("user", JSON.stringify(response.user));
  },

  // Get saved user from localStorage
  getSavedUser(): User | null {
    try {
      const userData = localStorage.getItem("user");
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error("Error parsing saved user data:", error);
      return null;
    }
  },

  // Get saved token from localStorage
  getSavedToken(): string | null {
    return localStorage.getItem("auth_token");
  },

  // Clear auth data from localStorage
  clearAuthData(): void {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
  },
};
