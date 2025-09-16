import { AnimatedPage } from "@/components/ui/animated-page";
import { Navigation } from "@/components/ui/navigation";
import { useCompare } from "@/contexts/CompareContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getAssetUrl } from "@/lib/utils";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { carsData } from "@/data/cars";

export default function Compare() {
  const { selected, clear, toggle, removeById } = useCompare();

  return (
    <AnimatedPage animation="automotive">
      <div className="min-h-screen bg-background">
        <Navigation />

        <main className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">Compare Cars</h1>
            <Button variant="outline" onClick={clear}>Clear</Button>
          </div>

          {/* Selected summary and controls */}
          <div className="mb-6 flex items-center gap-4 flex-wrap">
            {selected.map((car) => (
              <div key={car.id} className="flex items-center gap-2 px-3 py-2 rounded border bg-card/50">
                <img src={getAssetUrl(car.image)} alt={car.name} className="w-10 h-8 object-cover rounded" />
                <span className="text-sm">{car.brand} {car.name}</span>
                <Button size="sm" variant="outline" onClick={() => removeById(car.id)}>Remove</Button>
              </div>
            ))}
            {selected.length > 0 && (
              <Button size="sm" variant="ghost" onClick={clear}>Clear All</Button>
            )}
          </div>

          {/* Catalog to add/remove cars */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-3">Choose cars to compare</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {carsData.map((car) => {
                const isSel = selected.some((c) => c.id === car.id);
                return (
                  <div key={car.id} className="p-3 rounded border bg-card/40 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img src={getAssetUrl(car.image)} alt={car.name} className="w-16 h-12 object-cover rounded" />
                      <div>
                        <div className="font-medium text-sm">{car.brand} {car.name}</div>
                        <div className="text-xs text-muted-foreground">₹{car.price}</div>
                      </div>
                    </div>
                    <Button size="sm" variant={isSel ? "default" : "outline"} onClick={() => toggle(car as any)}>
                      {isSel ? "Selected" : "Add"}
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>

          {selected.length === 0 ? (
            <div className="text-muted-foreground">Select cars above to start comparing.</div>
          ) : (
            <div className="overflow-x-auto">
              <Table className="min-w-[640px]">
                <TableHeader>
                  <TableRow>
                    <TableHead>Spec</TableHead>
                    <TableHead>{selected[0] ? `${selected[0].brand} ${selected[0].name}` : "Car A"}</TableHead>
                    <TableHead>{selected[1] ? `${selected[1].brand} ${selected[1].name}` : "Car B"}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Image</TableCell>
                    <TableCell>
                      {selected[0] && (
                        <img src={getAssetUrl(selected[0].image)} alt={selected[0].name} className="w-28 h-20 object-cover rounded" />
                      )}
                    </TableCell>
                    <TableCell>
                      {selected[1] && (
                        <img src={getAssetUrl(selected[1].image)} alt={selected[1].name} className="w-28 h-20 object-cover rounded" />
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Price</TableCell>
                    <TableCell className="font-medium text-primary">{selected[0]?.price ?? "-"}</TableCell>
                    <TableCell className="font-medium text-primary">{selected[1]?.price ?? "-"}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Fuel Type</TableCell>
                    <TableCell><Badge>{selected[0]?.fuelType ?? "-"}</Badge></TableCell>
                    <TableCell><Badge>{selected[1]?.fuelType ?? "-"}</Badge></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Transmission</TableCell>
                    <TableCell>{selected[0]?.transmission ?? "-"}</TableCell>
                    <TableCell>{selected[1]?.transmission ?? "-"}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Seating</TableCell>
                    <TableCell>{selected[0]?.seating ?? "-"}</TableCell>
                    <TableCell>{selected[1]?.seating ?? "-"}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Mileage</TableCell>
                    <TableCell>{selected[0]?.mileage ?? "-"}</TableCell>
                    <TableCell>{selected[1]?.mileage ?? "-"}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Rating</TableCell>
                    <TableCell>{selected[0]?.rating ?? "-"}</TableCell>
                    <TableCell>{selected[1]?.rating ?? "-"}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Top Features</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-2">
                        {selected[0]?.features.slice(0, 6).map((f, i) => (
                          <Badge key={i} variant="secondary">{f}</Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-2">
                        {selected[1]?.features.slice(0, 6).map((f, i) => (
                          <Badge key={i} variant="secondary">{f}</Badge>
                        ))}
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          )}
        </main>
      </div>
    </AnimatedPage>
  );
}


