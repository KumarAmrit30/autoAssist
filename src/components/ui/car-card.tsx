import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Star, Fuel, Settings, Users } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { getAssetUrl, getAltCasingAssetUrlIfExists } from "@/lib/utils";
import { useCompare } from "@/contexts/CompareContext";

interface CarCardProps {
  car: {
    id: string;
    name: string;
    brand: string;
    price: string;
    image: string;
    images?: string[];
    rating: number;
    fuelType: string;
    transmission: string;
    seating: number;
    mileage: string;
    features: string[];
  };
  onViewDetails?: (carId: string) => void;
}

export function CarCard({ car, onViewDetails }: CarCardProps) {
  const { selected, toggle } = useCompare();
  const isSelected = selected.some((c) => c.id === car.id);
  const cretaFolderImages = [
    "/assets/images/Creta/cretakingknightinnerkv-pc.webp",
    "/assets/images/Creta/creta-n-line-exterior-right-front-three-quarter-25.webp",
    "/assets/images/Creta/creta-n-line-exterior-right-side-view-4.webp",
    "/assets/images/Creta/hyundai-creta-left-rear-three-quarter0.webp",
  ];
  const imagesToShow = car.id === "1" ? cretaFolderImages : car.images;

  return (
    <Card className="group hover:border-primary/50 transition-all duration-300 hover:shadow-automotive bg-card/50 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <div
          className="relative cursor-pointer"
          onClick={() => onViewDetails?.(car.id)}
          onKeyDown={(e) => {
            if (e.key === "Enter") onViewDetails?.(car.id);
          }}
          role="button"
          tabIndex={0}
        >
          {imagesToShow && imagesToShow.length > 0 ? (
            <div className="relative">
              <Carousel className="[&_.embla__container]:rounded-lg">
                <CarouselContent>
                  {imagesToShow.map((src, idx) => (
                    <CarouselItem key={idx}>
                      <img
                        src={getAssetUrl(src)}
                        alt={`${car.name} ${idx + 1}`}
                        className="w-full h-48 object-cover rounded-lg bg-secondary/20"
                        onError={(e) => {
                          // Fallback to placeholder on load failure and log URL for debugging
                          // eslint-disable-next-line no-console
                          const alt = getAltCasingAssetUrlIfExists(src);
                          if (alt) {
                            (e.currentTarget as HTMLImageElement).src = alt;
                          } else {
                            console.warn("Image failed to load:", getAssetUrl(src));
                            (e.currentTarget as HTMLImageElement).src = getAssetUrl("/placeholder.svg");
                          }
                        }}
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="-left-3" onPointerDownCapture={(e) => e.stopPropagation()} />
                <CarouselNext className="-right-3" onPointerDownCapture={(e) => e.stopPropagation()} />
              </Carousel>
            </div>
          ) : (
            <img
              src={getAssetUrl(car.image)}
              alt={car.name}
              className="w-full h-48 object-cover rounded-lg bg-secondary/20"
              onError={(e) => {
                // eslint-disable-next-line no-console
                const alt = getAltCasingAssetUrlIfExists(car.image);
                if (alt) {
                  (e.currentTarget as HTMLImageElement).src = alt;
                } else {
                  console.warn("Image failed to load:", getAssetUrl(car.image));
                  (e.currentTarget as HTMLImageElement).src = getAssetUrl("/placeholder.svg");
                }
              }}
            />
          )}
          <Button
            size="icon"
            variant="ghost"
            className="absolute top-2 right-2 bg-background/80 hover:bg-background"
            onClick={(e) => e.stopPropagation()}
          >
            <Heart className="w-4 h-4" />
          </Button>
          <Badge className="absolute bottom-2 left-2 bg-primary/90 text-primary-foreground">
            {car.fuelType}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div>
          <CardTitle className="text-lg group-hover:text-primary transition-colors">
            {car.brand} {car.name}
          </CardTitle>
          <div className="flex items-center justify-between mt-2">
            <div className="text-2xl font-bold text-primary">
              ₹{car.price}
            </div>
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{car.rating}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Fuel className="w-3 h-3" />
            <span>{car.mileage}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Settings className="w-3 h-3" />
            <span>{car.transmission}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="w-3 h-3" />
            <span>{car.seating} Seater</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1">
          {car.features.slice(0, 3).map((feature, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {feature}
            </Badge>
          ))}
          {car.features.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{car.features.length - 3} more
            </Badge>
          )}
        </div>

        <div className="flex space-x-2 pt-2">
          <Button
            className="flex-1"
            onClick={() => onViewDetails?.(car.id)}
          >
            View Details
          </Button>
          <Button
            variant={isSelected ? "default" : "outline"}
            className="flex-1"
            onClick={() => toggle(car as any)}
          >
            {isSelected ? "Selected" : "Compare"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}