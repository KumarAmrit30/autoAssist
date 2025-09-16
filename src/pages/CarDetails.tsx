import { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AnimatedPage } from "@/components/ui/animated-page";
import { Navigation } from "@/components/ui/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { getAssetUrl, getAltCasingAssetUrlIfExists } from "@/lib/utils";
import { getCarById } from "@/data/cars";

export default function CarDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const car = useMemo(() => (id ? getCarById(id) : undefined), [id]);

  if (!car) {
    return (
      <AnimatedPage animation="automotive">
        <div className="min-h-screen bg-background">
          <Navigation />
          <main className="container mx-auto px-4 py-8">
            <div className="mb-6">
              <Button variant="outline" onClick={() => navigate(-1)}>
                Back
              </Button>
            </div>
            <div className="text-center text-muted-foreground">Car not found.</div>
          </main>
        </div>
      </AnimatedPage>
    );
  }

  const cretaFolderImages = [
    "/assets/images/Creta/cretakingknightinnerkv-pc.webp",
    "/assets/images/Creta/creta-n-line-exterior-right-front-three-quarter-25.webp",
    "/assets/images/Creta/creta-n-line-exterior-right-side-view-4.webp",
    "/assets/images/Creta/hyundai-creta-left-rear-three-quarter0.webp",
  ];
  const images = (car.id === "1" ? cretaFolderImages : (car as any).images) as string[] | undefined;

  return (
    <AnimatedPage animation="automotive">
      <div className="min-h-screen bg-background">
        <Navigation />

        <main className="container mx-auto px-4 py-8 space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">{car.brand} {car.name}</h1>
              <div className="mt-2 flex items-center gap-2">
                <Badge>{car.fuelType}</Badge>
                <span className="text-muted-foreground">{car.transmission}</span>
                <span className="text-muted-foreground">{car.seating} Seater</span>
              </div>
            </div>
            <div className="text-2xl font-bold text-primary">₹{car.price}</div>
          </div>

          <section>
            {images && images.length > 0 ? (
              <div className="relative">
                <Carousel>
                  <CarouselContent>
                    {images.map((src, idx) => (
                      <CarouselItem key={idx}>
                        <img 
                          src={getAssetUrl(src)} 
                          alt={`${car.name} ${idx + 1}`} 
                          className="w-full max-h-[500px] h-[45vh] object-cover rounded-lg bg-secondary/20"
                          onError={(e) => {
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
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>
            ) : (
              <img 
                src={getAssetUrl(car.image)} 
                alt={car.name} 
                className="w-full max-h-[500px] h-[45vh] object-cover rounded-lg bg-secondary/20" 
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
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Key Features</h2>
            <div className="flex flex-wrap gap-2">
              {car.features.map((f, i) => (
                <Badge key={i} variant="secondary">{f}</Badge>
              ))}
            </div>
          </section>

          <div>
            <Button onClick={() => navigate(-1)} variant="outline">Back</Button>
          </div>
        </main>
      </div>
    </AnimatedPage>
  );
}


