import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AnimatedPage } from "@/components/ui/animated-page";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ChevronLeft,
  ChevronRight,
  Home,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { getCarById } from "@/data/cars";

export default function CarDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Use static data only
  const actualCar = id ? getCarById(id) : undefined;

  const images =
    actualCar?.images && actualCar.images.length > 0
      ? actualCar.images
      : actualCar?.image
      ? [actualCar.image]
      : ["/placeholder.svg"];

  const [currentIndex, setCurrentIndex] = useState(0);

  const goPrev = () =>
    setCurrentIndex((idx) => (idx === 0 ? images.length - 1 : idx - 1));
  const goNext = () =>
    setCurrentIndex((idx) => (idx === images.length - 1 ? 0 : idx + 1));

  // Not found state
  if (!actualCar) {
    return (
      <AnimatedPage animation="automotive">
        <div className="container mx-auto px-4 py-12 text-center space-y-6">
          <AlertCircle className="w-12 h-12 mx-auto text-muted-foreground" />
          <div className="text-2xl font-semibold">Car not found</div>
          <p className="text-muted-foreground">
            The car you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => navigate("/home")}>Go to Home</Button>
        </div>
      </AnimatedPage>
    );
  }

  return (
    <AnimatedPage animation="automotive">
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-6">
            <Button variant="outline" size="sm" onClick={() => navigate(-1)}>
              <ChevronLeft className="w-4 h-4 mr-1" /> Back
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/home")}
            >
              <Home className="w-4 h-4 mr-1" /> Home
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-3">
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative">
                    <img
                      src={images[currentIndex]}
                      alt={`${actualCar.name} image ${currentIndex + 1}`}
                      className="w-full h-[360px] md:h-[480px] object-cover"
                    />

                    {images.length > 1 && (
                      <>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/70 hover:bg-background"
                          onClick={goPrev}
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/70 hover:bg-background"
                          onClick={goNext}
                        >
                          <ChevronRight className="w-5 h-5" />
                        </Button>
                      </>
                    )}

                    {images.length > 1 && (
                      <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-2">
                        {images.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setCurrentIndex(idx)}
                            className={`h-2 rounded-full transition-all ${
                              idx === currentIndex
                                ? "w-6 bg-primary"
                                : "w-2 bg-muted-foreground/50"
                            }`}
                            aria-label={`Go to image ${idx + 1}`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {images.length > 1 && (
                <div className="mt-4 grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
                  {images.map((src, idx) => (
                    <button
                      key={src + idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={`border rounded overflow-hidden hover:opacity-90 focus:outline-none ${
                        idx === currentIndex
                          ? "border-primary"
                          : "border-border"
                      }`}
                    >
                      <img
                        src={src}
                        alt={`thumb ${idx + 1}`}
                        className="w-full h-16 object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="lg:col-span-2 space-y-4">
              <div>
                <h1 className="text-3xl font-bold">
                  {actualCar.brand} {actualCar.name}
                </h1>
                <div className="text-2xl font-semibold text-primary mt-2">
                  ₹{actualCar.price}
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge>{actualCar.fuelType}</Badge>
                <Badge variant="secondary">{actualCar.transmission}</Badge>
                <Badge variant="outline">{actualCar.seating} Seater</Badge>
                <Badge variant="outline">{actualCar.mileage}</Badge>
              </div>

              {actualCar.features?.length ? (
                <div>
                  <div className="font-medium mb-2">Key Features</div>
                  <div className="flex flex-wrap gap-2">
                    {actualCar.features.map((feature) => (
                      <Badge key={feature} variant="secondary">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              ) : null}

              <div className="pt-2">
                <Button className="w-full">Book Test Drive</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
}
