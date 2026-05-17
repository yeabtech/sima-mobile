import type { ProductFilters } from "@/lib/products";

export function parseProductSearchParams(
  params: Record<string, string | string[] | undefined>,
): ProductFilters {
  const get = (key: string) => {
    const value = params[key];
    return Array.isArray(value) ? value[0] : value;
  };

  const page = Number(get("page") ?? "1");
  const minPrice = get("minPrice");
  const maxPrice = get("maxPrice");

  return {
    q: get("q") || undefined,
    category: get("category") || undefined,
    brand: get("brand") || undefined,
    featured: get("featured") === "true",
    minPrice: minPrice ? Number(minPrice) : undefined,
    maxPrice: maxPrice ? Number(maxPrice) : undefined,
    page: Number.isFinite(page) && page > 0 ? page : 1,
    pageSize: 12,
  };
}
