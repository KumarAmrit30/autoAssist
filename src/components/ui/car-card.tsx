import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Star, Fuel, Settings, Users } from "lucide-react";

interface CarCardProps {
  car: {
    id: string;
    name: string;
    brand: string;
    price: string;
    image?: string;
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
  const displayImage = car.image ?? (car.images && car.images.length > 0 ? car.images[0] : "/placeholder.svg");
  return (
    <Card className="group hover:border-primary/50 transition-all duration-300 hover:shadow-automotive bg-card/50 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <div className="relative">
          <img
            src={displayImage}
            alt={car.name}
            className="w-full h-48 object-cover rounded-lg bg-secondary/20"
          />
          <Button
            size="icon"
            variant="ghost"
            className="absolute top-2 right-2 bg-background/80 hover:bg-background"
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
          <Button variant="outline" className="flex-1">
            Compare
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}