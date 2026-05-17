import Link from "next/link";
import { ProductCard } from "@/components/products/product-card";
import type { ProductWithMetadata } from "@/lib/types";

type ProductSectionProps = {
  title: string;
  subtitle: string;
  products: ProductWithMetadata[];
  viewAllHref?: string;
};

export function ProductSection({
  title,
  subtitle,
  products,
  viewAllHref = "/products",
}: ProductSectionProps) {
  return (
    <section className="bg-background px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-zinc-950 dark:text-white">
              {title}
            </h2>
            <p className="mt-2 text-base font-medium text-zinc-700 dark:text-zinc-400">
              {subtitle}
            </p>
          </div>
          <Link
            href={viewAllHref}
            className="text-sm font-bold text-violet-700 hover:text-violet-800 dark:text-violet-400 dark:hover:text-violet-300"
          >
            View all →
          </Link>
        </div>

        {products.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-zinc-400 px-6 py-12 text-center text-base font-medium text-zinc-700 dark:border-zinc-700 dark:text-zinc-400">
            No products yet. Run the database seed after connecting PostgreSQL.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
