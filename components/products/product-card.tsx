"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { ProductWithMetadata } from "@/lib/types";
import { PriceDisplay } from "@/components/ui/price-display";

type ProductCardProps = {
  product: ProductWithMetadata;
  index?: number;
};

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const brand =
    typeof product.metadata.brand === "string"
      ? product.metadata.brand
      : undefined;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      whileHover={{ y: -6 }}
      className="group"
    >
      <Link
        href={`/products/${product.id}`}
        className="flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition-shadow hover:shadow-xl hover:shadow-violet-500/10 dark:border-zinc-700 dark:bg-zinc-900"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-zinc-100 dark:bg-zinc-800">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover transition duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-4xl">
              📱
            </div>
          )}
          <span className="absolute left-3 top-3 rounded-full bg-white px-2.5 py-1 text-xs font-bold text-zinc-900 shadow dark:bg-zinc-950 dark:text-zinc-100">
            {product.category}
          </span>
        </div>
        <div className="flex flex-1 flex-col gap-2 p-4">
          {brand && (
            <p className="text-xs font-bold uppercase tracking-wide text-violet-700 dark:text-violet-400">
              {brand}
            </p>
          )}
          <h3 className="line-clamp-2 font-bold text-zinc-950 dark:text-zinc-50">
            {product.name}
          </h3>
          <PriceDisplay
            price={product.price}
            size="md"
            className="mt-auto"
          />
        </div>
      </Link>
    </motion.article>
  );
}
