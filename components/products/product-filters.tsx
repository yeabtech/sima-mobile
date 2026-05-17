"use client";

import { Search, SlidersHorizontal, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useTransition } from "react";
import { CATEGORIES } from "@/lib/categories";
import { formatEtbFromUsd, formatUsd } from "@/lib/currency";
import { cn } from "@/lib/utils";

type ProductFiltersProps = {
  brands: string[];
  priceBounds: { min: number; max: number };
  current: {
    q?: string;
    category?: string;
    brand?: string;
    minPrice?: number;
    maxPrice?: number;
    featured?: boolean;
  };
};

export function ProductFilters({
  brands,
  priceBounds,
  current,
}: ProductFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const updateParams = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("page");
      for (const [key, value] of Object.entries(updates)) {
        if (value === null || value === "") params.delete(key);
        else params.set(key, value);
      }
      startTransition(() => {
        const qs = params.toString();
        router.push(qs ? `${pathname}?${qs}` : pathname);
      });
    },
    [pathname, router, searchParams],
  );

  const hasFilters =
    current.q ||
    current.category ||
    current.brand ||
    current.minPrice !== undefined ||
    current.maxPrice !== undefined ||
    current.featured;

  return (
    <aside
      className={cn(
        "surface-card space-y-6 p-5",
        isPending && "opacity-70",
      )}
    >
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 font-bold text-zinc-950 dark:text-white">
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </h2>
        {hasFilters && (
          <button
            type="button"
            onClick={() => router.push(pathname)}
            className="flex items-center gap-1 text-xs font-medium text-violet-600 hover:text-violet-700 dark:text-violet-400"
          >
            <X className="h-3 w-3" />
            Clear
          </button>
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          const fd = new FormData(e.currentTarget);
          updateParams({ q: String(fd.get("q") || "") });
        }}
      >
        <label className="mb-2 block text-sm font-semibold text-zinc-900 dark:text-zinc-300">
          Search
        </label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
          <input
            name="q"
            defaultValue={current.q ?? ""}
            placeholder="Name, description…"
            className="input-field py-2.5 pl-10"
          />
        </div>
        <button
          type="submit"
          className="mt-2 w-full rounded-xl bg-zinc-900 py-2 text-sm font-medium text-white dark:bg-zinc-100 dark:text-zinc-900"
        >
          Search
        </button>
      </form>

      <FilterSelect
        label="Category"
        value={current.category ?? ""}
        onChange={(v) => updateParams({ category: v || null })}
        options={[
          { value: "", label: "All categories" },
          ...CATEGORIES.map((c) => ({ value: c, label: c })),
        ]}
      />

      {brands.length > 0 && (
        <FilterSelect
          label="Brand"
          value={current.brand ?? ""}
          onChange={(v) => updateParams({ brand: v || null })}
          options={[
            { value: "", label: "All brands" },
            ...brands.map((b) => ({ value: b, label: b })),
          ]}
        />
      )}

      <div>
        <label className="mb-2 block text-sm font-semibold text-zinc-900 dark:text-zinc-300">
          Price range (USD)
        </label>
        <p className="mb-2 text-xs font-medium text-zinc-600 dark:text-zinc-400">
          Storefront shows USD and ETB (e.g. {formatUsd(priceBounds.min)} ≈{" "}
          {formatEtbFromUsd(priceBounds.min)})
        </p>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            min={0}
            step="0.01"
            placeholder={`Min (${priceBounds.min})`}
            defaultValue={current.minPrice ?? ""}
            onBlur={(e) =>
              updateParams({ minPrice: e.target.value || null })
            }
            className="input-field"
          />
          <input
            type="number"
            min={0}
            step="0.01"
            placeholder={formatUsd(priceBounds.max)}
            defaultValue={current.maxPrice ?? ""}
            onBlur={(e) =>
              updateParams({ maxPrice: e.target.value || null })
            }
            className="input-field"
          />
        </div>
      </div>

      <label className="flex cursor-pointer items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={current.featured ?? false}
          onChange={(e) =>
            updateParams({
              featured: e.target.checked ? "true" : null,
            })
          }
          className="rounded border-zinc-300 text-violet-600 focus:ring-violet-500"
        />
        Featured only
      </label>
    </aside>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-zinc-900 dark:text-zinc-300">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="input-field"
      >
        {options.map((opt) => (
          <option key={opt.value || "all"} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
