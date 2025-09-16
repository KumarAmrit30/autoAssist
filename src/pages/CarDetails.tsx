import { useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCarById } from "@/data/cars";
import { AnimatedPage } from "@/components/ui/animated-page";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Home } from "lucide-react";

export default function CarDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const car = useMemo(() => (id ? getCarById(id) : undefined), [id]);

  const images = car?.images && car.images.length > 0
    ? car.images
    : car?.image
      ? [car.image]
      : ["/placeholder.svg"];

  const [currentIndex, setCurrentIndex] = useState(0);

  const goPrev = () => setCurrentIndex((idx) => (idx === 0 ? images.length - 1 : idx - 1));
  const goNext = () => setCurrentIndex((idx) => (idx === images.length - 1 ? 0 : idx + 1));

  if (!car) {
    return (
      <AnimatedPage animation="automotive">
        <div className="container mx-auto px-4 py-12 text-center space-y-6">
          <div className="text-2xl font-semibold">Car not found</div>
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
            <Button variant="outline" size="sm" onClick={() => navigate("/home")}> 
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
                      alt={`${car.name} image ${currentIndex + 1}`}
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
                              idx === currentIndex ? "w-6 bg-primary" : "w-2 bg-muted-foreground/50"
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
                        idx === currentIndex ? "border-primary" : "border-border"
                      }`}
                    >
                      <img src={src} alt={`thumb ${idx + 1}`} className="w-full h-16 object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="lg:col-span-2 space-y-4">
              <div>
                <h1 className="text-3xl font-bold">
                  {car.brand} {car.name}
                </h1>
                <div className="text-2xl font-semibold text-primary mt-2">₹{car.price}</div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge>{car.fuelType}</Badge>
                <Badge variant="secondary">{car.transmission}</Badge>
                <Badge variant="outline">{car.seating} Seater</Badge>
                <Badge variant="outline">{car.mileage}</Badge>
              </div>

              {car.features?.length ? (
                <div>
                  <div className="font-medium mb-2">Key Features</div>
                  <div className="flex flex-wrap gap-2">
                    {car.features.map((feature) => (
                      <Badge key={feature} variant="secondary">{feature}</Badge>
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


