import { useMemo, useState, useEffect } from "react";
import { Navigation } from "@/components/ui/navigation";
import { CarCard } from "@/components/ui/car-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, TrendingUp, Star, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { AnimatedPage } from "@/components/ui/animated-page";
import { useCars, usePopularBrands, useFuelTypes } from "@/hooks/useCars";
import { carsData, searchCars } from "@/data/cars"; // Fallback data

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const pageSize = 8;

  // API calls
  const {
    data: carsResponse,
    isLoading: carsLoading,
    error: carsError,
  } = useCars({
    query: searchQuery || undefined,
    page,
    limit: pageSize,
  });

  const { data: popularBrands = [], isLoading: brandsLoading } =
    usePopularBrands();
  const { data: fuelTypes = [], isLoading: fuelTypesLoading } = useFuelTypes();

  // Fallback to static data if API fails
  const cars = carsResponse?.cars || (carsError ? carsData : []);
  const totalPages =
    carsResponse?.totalPages ||
    Math.max(1, Math.ceil((carsError ? carsData.length : 0) / pageSize));
  const totalCars = carsResponse?.total || (carsError ? carsData.length : 0);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setPage(1);
  };

  const goToPage = (p: number) => setPage(Math.min(Math.max(1, p), totalPages));

  // Show loading state
  const isLoading = carsLoading || brandsLoading || fuelTypesLoading;

  return (
    <AnimatedPage animation="automotive">
      <div className="min-h-screen bg-background">
        <Navigation />

        <main className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <section className="text-center mb-12">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-5xl font-bold mb-6 bg-automotive-gradient bg-clip-text text-transparent">
                Find Your Perfect Car
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Discover, compare, and explore the best cars with our
                comprehensive automotive platform
              </p>

              {/* Search Bar */}
              <div className="relative max-w-2xl mx-auto mb-8">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  placeholder="Search by car name, brand, or fuel type..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-12 h-14 text-lg bg-card/50 border-border focus:border-primary transition-colors"
                />
                <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-automotive-gradient hover:shadow-glow">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>
          </section>

          {/* Quick Filters */}
          <section className="mb-8">
            <div className="flex flex-wrap gap-4 justify-center">
              <div className="space-x-2">
                <span className="text-sm font-medium text-muted-foreground">
                  Popular Brands:
                </span>
                {popularBrands.map((brand) => (
                  <Badge
                    key={brand}
                    variant="secondary"
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                    onClick={() => handleSearch(brand)}
                  >
                    {brand}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-4 justify-center mt-4">
              <div className="space-x-2">
                <span className="text-sm font-medium text-muted-foreground">
                  Fuel Type:
                </span>
                {fuelTypes.map((fuel) => (
                  <Badge
                    key={fuel}
                    variant="outline"
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
                    onClick={() => handleSearch(fuel)}
                  >
                    {fuel}
                  </Badge>
                ))}
              </div>
            </div>
          </section>

          {/* Featured Stats */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="text-center p-6 bg-card/30 rounded-lg border border-border/50">
              <TrendingUp className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="text-3xl font-bold text-primary">500+</div>
              <div className="text-muted-foreground">Cars Listed</div>
            </div>

            <div className="text-center p-6 bg-card/30 rounded-lg border border-border/50">
              <Star className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="text-3xl font-bold text-primary">4.5</div>
              <div className="text-muted-foreground">Average Rating</div>
            </div>

            <div className="text-center p-6 bg-card/30 rounded-lg border border-border/50">
              <Search className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="text-3xl font-bold text-primary">50K+</div>
              <div className="text-muted-foreground">Searches Daily</div>
            </div>
          </section>

          {/* Cars Grid */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold">
                {searchQuery
                  ? `Search Results for "${searchQuery}"`
                  : "Popular Cars"}
              </h2>
              <div className="text-muted-foreground">
                {totalCars} cars found
              </div>
            </div>

            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <span className="ml-2 text-lg">Loading cars...</span>
              </div>
            ) : cars.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {cars.map((car) => (
                  <CarCard
                    key={car.id}
                    car={car}
                    onViewDetails={(id) => navigate(`/cars/${id}`)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No cars found</h3>
                <p className="text-muted-foreground mb-4">
                  {carsError
                    ? "Unable to load cars from the server. Please try again later."
                    : "Try adjusting your search terms or browse our popular categories"}
                </p>
                <Button onClick={() => handleSearch("")} variant="outline">
                  View All Cars
                </Button>
              </div>
            )}
            {cars.length > 0 && totalPages > 1 && (
              <div className="mt-8">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          goToPage(page - 1);
                        }}
                      />
                    </PaginationItem>

                    {Array.from({ length: totalPages }).map((_, idx) => {
                      const p = idx + 1;
                      const isEdge = p === 1 || p === totalPages;
                      const isNear = Math.abs(p - page) <= 1;
                      if (totalPages <= 7 || isEdge || isNear) {
                        return (
                          <PaginationItem key={p}>
                            <PaginationLink
                              href="#"
                              isActive={p === page}
                              onClick={(e) => {
                                e.preventDefault();
                                goToPage(p);
                              }}
                            >
                              {p}
                            </PaginationLink>
                          </PaginationItem>
                        );
                      }
                      if (p === 2 && page > 3) {
                        return (
                          <PaginationItem key={p}>
                            <span className="px-2">…</span>
                          </PaginationItem>
                        );
                      }
                      if (p === totalPages - 1 && page < totalPages - 2) {
                        return (
                          <PaginationItem key={p}>
                            <span className="px-2">…</span>
                          </PaginationItem>
                        );
                      }
                      return null;
                    })}

                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          goToPage(page + 1);
                        }}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </section>
        </main>
      </div>
    </AnimatedPage>
  );
}
