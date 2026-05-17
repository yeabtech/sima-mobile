import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { ProductCard } from "@/components/products/product-card";
import { ProductSpecs } from "@/components/products/product-specs";
import {
  getProductById,
  getRelatedProducts,
} from "@/lib/products";
import { formatDualPrice } from "@/lib/currency";
import { PriceDisplay } from "@/components/ui/price-display";

type ProductPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById(id);
  if (!product) return { title: "Product not found" };

  const priceLabel = formatDualPrice(product.price);

  return {
    title: product.name,
    description:
      product.description ??
      `${product.name} — ${priceLabel.usd} (${priceLabel.etb}) at Sima Mobile`,
    openGraph: product.imageUrl
      ? { images: [{ url: product.imageUrl }] }
      : undefined,
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) notFound();

  const related = await getRelatedProducts(product);
  const brand =
    typeof product.metadata.brand === "string"
      ? product.metadata.brand
      : undefined;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Link
        href="/products"
        className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-violet-600 hover:text-violet-700 dark:text-violet-400"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to products
      </Link>

      <div className="grid gap-10 lg:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-8xl">
              📱
            </div>
          )}
        </div>

        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700 dark:bg-violet-950 dark:text-violet-300">
              {product.category}
            </span>
            {product.featured && (
              <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800 dark:bg-amber-950 dark:text-amber-200">
                Featured
              </span>
            )}
          </div>
          {brand && (
            <p className="mt-3 text-sm font-medium uppercase tracking-wide text-zinc-500">
              {brand}
            </p>
          )}
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
            {product.name}
          </h1>
          <PriceDisplay price={product.price} size="lg" className="mt-4" />
          {product.description && (
            <p className="mt-6 leading-relaxed text-zinc-600 dark:text-zinc-400">
              {product.description}
            </p>
          )}
          <div className="mt-10">
            <h2 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-white">
              Specifications
            </h2>
            <ProductSpecs metadata={product.metadata} />
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20 border-t border-zinc-200 pt-16 dark:border-zinc-800">
          <h2 className="mb-8 text-2xl font-bold text-zinc-900 dark:text-white">
            Related products
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((item, index) => (
              <ProductCard key={item.id} product={item} index={index} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
