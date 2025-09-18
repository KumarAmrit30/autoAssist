import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { carService } from "@/services/carService";
import { Car, CarSearchParams, Review } from "@/types/car";

// Query keys for react-query
export const carKeys = {
  all: ["cars"] as const,
  lists: () => [...carKeys.all, "list"] as const,
  list: (params: CarSearchParams) => [...carKeys.lists(), params] as const,
  details: () => [...carKeys.all, "detail"] as const,
  detail: (id: string) => [...carKeys.details(), id] as const,
  reviews: (carId: string) => [...carKeys.detail(carId), "reviews"] as const,
  brands: () => [...carKeys.all, "brands"] as const,
  fuelTypes: () => [...carKeys.all, "fuelTypes"] as const,
};

// Hook to fetch cars with search and filters
export const useCars = (params?: CarSearchParams) => {
  return useQuery({
    queryKey: carKeys.list(params || {}),
    queryFn: () => carService.getCars(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Hook to fetch a single car by ID
export const useCar = (id: string) => {
  return useQuery({
    queryKey: carKeys.detail(id),
    queryFn: () => carService.getCarById(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Hook to search cars (simplified)
export const useCarSearch = (query: string) => {
  return useQuery({
    queryKey: [...carKeys.lists(), "search", query],
    queryFn: () => carService.searchCars(query),
    enabled: !!query && query.length > 0,
    staleTime: 30 * 1000, // 30 seconds for search results
  });
};

// Hook to fetch car reviews
export const useCarReviews = (carId: string) => {
  return useQuery({
    queryKey: carKeys.reviews(carId),
    queryFn: () => carService.getCarReviews(carId),
    enabled: !!carId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Hook to add a car review
export const useAddCarReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      carId,
      review,
    }: {
      carId: string;
      review: Omit<Review, "id" | "carId" | "createdAt" | "updatedAt">;
    }) => {
      return carService.addCarReview(carId, review);
    },
    onSuccess: (data, variables) => {
      // Invalidate and refetch car reviews
      queryClient.invalidateQueries({
        queryKey: carKeys.reviews(variables.carId),
      });
      // Also invalidate the car details to update rating if needed
      queryClient.invalidateQueries({
        queryKey: carKeys.detail(variables.carId),
      });
    },
  });
};

// Hook to fetch popular brands
export const usePopularBrands = () => {
  return useQuery({
    queryKey: carKeys.brands(),
    queryFn: () => carService.getPopularBrands(),
    staleTime: 60 * 60 * 1000, // 1 hour
  });
};

// Hook to fetch fuel types
export const useFuelTypes = () => {
  return useQuery({
    queryKey: carKeys.fuelTypes(),
    queryFn: () => carService.getFuelTypes(),
    staleTime: 60 * 60 * 1000, // 1 hour
  });
};
