import type { ProductMetadata } from "@/lib/types";
import { formatLabel } from "@/lib/utils";

type ProductSpecsProps = {
  metadata: ProductMetadata;
};

export function ProductSpecs({ metadata }: ProductSpecsProps) {
  const entries = Object.entries(metadata || {});

  if (entries.length === 0) {
    return (
      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        No specifications listed for this product.
      </p>
    );
  }

  return (
    <dl className="divide-y divide-zinc-200 rounded-2xl border border-zinc-200 bg-white dark:divide-zinc-800 dark:border-zinc-800 dark:bg-zinc-900">
      {entries.map(([key, value]) => (
        <div
          key={key}
          className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
        >
          <dt className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
            {formatLabel(key)}
          </dt>
          <dd className="text-sm text-zinc-900 dark:text-zinc-100">
            {String(value)}
          </dd>
        </div>
      ))}
    </dl>
  );
}
