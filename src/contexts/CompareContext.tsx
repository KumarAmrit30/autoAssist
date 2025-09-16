import React, { createContext, useContext, useMemo, useState } from "react";
import { carsData } from "@/data/cars";

type Car = typeof carsData[number];

type CompareContextValue = {
  selected: Car[];
  toggle: (car: Car) => void;
  clear: () => void;
  removeById: (id: string) => void;
};

const CompareContext = createContext<CompareContextValue | undefined>(undefined);

export function CompareProvider({ children }: { children: React.ReactNode }) {
  const [selected, setSelected] = useState<Car[]>([]);

  const toggle = (car: Car) => {
    setSelected((prev) => {
      const exists = prev.find((c) => c.id === car.id);
      if (exists) return prev.filter((c) => c.id !== car.id);
      if (prev.length >= 2) return [prev[1], car];
      return [...prev, car];
    });
  };

  const removeById = (id: string) => setSelected((prev) => prev.filter((c) => c.id !== id));

  const value = useMemo<CompareContextValue>(
    () => ({ selected, toggle, clear: () => setSelected([]), removeById }),
    [selected],
  );

  return <CompareContext.Provider value={value}>{children}</CompareContext.Provider>;
}

export function useCompare() {
  const ctx = useContext(CompareContext);
  if (!ctx) throw new Error("useCompare must be used within CompareProvider");
  return ctx;
}


