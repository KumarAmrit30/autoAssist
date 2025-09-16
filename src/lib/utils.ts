import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Ensures public asset paths work with Vite's base (e.g., "/autoAssist" in production)
export function getAssetUrl(relativePath: string): string {
  const base = (import.meta as any).env?.BASE_URL ?? "/";
  const normalizedBase = String(base).endsWith("/") ? String(base).slice(0, -1) : String(base);
  const normalizedPath = relativePath.startsWith("/") ? relativePath : `/${relativePath}`;
  return `${normalizedBase}${normalizedPath}`;
}

export function getAltCasingAssetUrlIfExists(originalPath: string): string | null {
  // Swap 'Creta' and 'creta' casing as a common mismatch guard
  if (originalPath.includes("/Creta/")) {
    return getAssetUrl(originalPath.replace("/Creta/", "/creta/"));
  }
  if (originalPath.includes("/creta/")) {
    return getAssetUrl(originalPath.replace("/creta/", "/Creta/"));
  }
  return null;
}