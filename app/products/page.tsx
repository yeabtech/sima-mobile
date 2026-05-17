import { Suspense } from "react";
import { ProductCard } from "@/components/products/product-card";
import { ProductFilters } from "@/components/products/product-filters";
import { Pagination } from "@/components/products/pagination";
import { ProductGridSkeleton } from "@/components/products/product-skeleton";
import {
  getDistinctBrands,
  getPriceBounds,
  getProducts,
} from "@/lib/products";
import { parseProductSearchParams } from "@/lib/search-params";

type ProductsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export const metadata = {
  title: "Products",
  description: "Browse phones, accessories, chargers, and more at Sima Mobile.",
};

async function ProductsContent({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const filters = parseProductSearchParams(searchParams);
  const [result, brands, priceBounds] = await Promise.all([
    getProducts(filters),
    getDistinctBrands(),
    getPriceBounds(),
  ]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-950 dark:text-white">
          All products
        </h1>
        <p className="mt-2 text-base font-medium text-zinc-700 dark:text-zinc-400">
          {result.total} product{result.total !== 1 ? "s" : ""} found
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        <Suspense fallback={<div className="h-96 animate-pulse rounded-2xl bg-zinc-200 dark:bg-zinc-800" />}>
          <ProductFilters
            brands={brands}
            priceBounds={priceBounds}
            current={{
              q: filters.q,
              category: filters.category,
              brand: filters.brand,
              minPrice: filters.minPrice,
              maxPrice: filters.maxPrice,
              featured: filters.featured,
            }}
          />
        </Suspense>

        <div>
          {result.products.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-zinc-300 px-6 py-16 text-center dark:border-zinc-700">
              <p className="text-lg font-medium text-zinc-800 dark:text-zinc-200">
                No products match your filters
              </p>
              <p className="mt-2 text-sm text-zinc-500">
                Try adjusting search or filters.
              </p>
            </div>
          ) : (
            <>
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {result.products.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    index={index}
                  />
                ))}
              </div>
              <div className="mt-10">
                <Suspense fallback={null}>
                  <Pagination page={result.page} totalPages={result.totalPages} />
                </Suspense>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;

  return (
    <Suspense fallback={<ProductsLoading />}>
      <ProductsContent searchParams={params} />
    </Suspense>
  );
}

function ProductsLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-10 h-20 animate-pulse rounded-xl bg-zinc-200 dark:bg-zinc-800" />
      <ProductGridSkeleton count={6} />
    </div>
  );
}
