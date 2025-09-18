import { apiClient, API_CONFIG } from "@/config/api";
import { Car, CarSearchParams, CarSearchResponse, Review } from "@/types/car";

export const carService = {
  // Get all cars with optional search and filters
  async getCars(params?: CarSearchParams): Promise<CarSearchResponse> {
    const searchParams = new URLSearchParams();

    if (params?.query) searchParams.append("query", params.query);
    if (params?.page) searchParams.append("page", params.page.toString());
    if (params?.limit) searchParams.append("limit", params.limit.toString());
    if (params?.sortBy) searchParams.append("sortBy", params.sortBy);
    if (params?.sortOrder) searchParams.append("sortOrder", params.sortOrder);

    // Add filters
    if (params?.filters) {
      if (params.filters.brand)
        searchParams.append("brand", params.filters.brand);
      if (params.filters.fuelType)
        searchParams.append("fuelType", params.filters.fuelType);
      if (params.filters.transmission)
        searchParams.append("transmission", params.filters.transmission);
      if (params.filters.seating)
        searchParams.append("seating", params.filters.seating.toString());
      if (params.filters.rating)
        searchParams.append("rating", params.filters.rating.toString());
      if (params.filters.priceRange) {
        searchParams.append(
          "minPrice",
          params.filters.priceRange.min.toString()
        );
        searchParams.append(
          "maxPrice",
          params.filters.priceRange.max.toString()
        );
      }
    }

    const queryString = searchParams.toString();
    const endpoint = queryString
      ? `${API_CONFIG.ENDPOINTS.CARS}?${queryString}`
      : API_CONFIG.ENDPOINTS.CARS;

    return apiClient.get<CarSearchResponse>(endpoint);
  },

  // Get a single car by ID
  async getCarById(id: string): Promise<Car> {
    return apiClient.get<Car>(API_CONFIG.ENDPOINTS.CAR_BY_ID(id));
  },

  // Search cars (simplified version)
  async searchCars(query: string): Promise<Car[]> {
    const response = await this.getCars({ query, limit: 50 });
    return response.cars;
  },

  // Get car reviews
  async getCarReviews(carId: string): Promise<Review[]> {
    return apiClient.get<Review[]>(API_CONFIG.ENDPOINTS.CAR_REVIEWS(carId));
  },

  // Add a review for a car
  async addCarReview(
    carId: string,
    review: Omit<Review, "id" | "carId" | "createdAt" | "updatedAt">
  ): Promise<Review> {
    return apiClient.post<Review>(
      API_CONFIG.ENDPOINTS.CAR_REVIEWS(carId),
      review
    );
  },

  // Get popular brands (could be a separate endpoint)
  async getPopularBrands(): Promise<string[]> {
    // This might be a separate endpoint or derived from cars data
    try {
      return apiClient.get<string[]>("/api/cars/brands");
    } catch (error) {
      // Fallback to static data if endpoint doesn't exist
      return [
        "Hyundai",
        "Maruti Suzuki",
        "Tata",
        "Mahindra",
        "Toyota",
        "Honda",
        "Kia",
        "Jeep",
      ];
    }
  },

  // Get available fuel types
  async getFuelTypes(): Promise<string[]> {
    try {
      return apiClient.get<string[]>("/api/cars/fuel-types");
    } catch (error) {
      // Fallback to static data if endpoint doesn't exist
      return ["Petrol", "Diesel", "Electric", "Hybrid"];
    }
  },
};
