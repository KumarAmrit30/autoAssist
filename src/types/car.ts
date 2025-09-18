// Car related types
export interface Car {
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
  description?: string;
  specifications?: {
    engine?: string;
    power?: string;
    torque?: string;
    fuelCapacity?: string;
    bootSpace?: string;
    groundClearance?: string;
    length?: string;
    width?: string;
    height?: string;
    wheelbase?: string;
  };
  reviews?: Review[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Review {
  id: string;
  carId: string;
  userId: string;
  userName: string;
  userEmail: string;
  rating: number;
  title: string;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

export interface CarSearchFilters {
  brand?: string;
  fuelType?: string;
  transmission?: string;
  priceRange?: {
    min: number;
    max: number;
  };
  seating?: number;
  rating?: number;
}

export interface CarSearchParams {
  query?: string;
  filters?: CarSearchFilters;
  page?: number;
  limit?: number;
  sortBy?: "name" | "price" | "rating" | "createdAt";
  sortOrder?: "asc" | "desc";
}

export interface CarSearchResponse {
  cars: Car[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
