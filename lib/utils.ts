export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

import { formatDualPrice, formatUsd } from "@/lib/currency";

/** @deprecated Use formatDualPrice or PriceDisplay for USD + ETB. */
export function formatPrice(price: number) {
  return formatUsd(price);
}

export { formatDualPrice, formatUsd };

export function formatLabel(key: string) {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/[_-]/g, " ")
    .trim()
    .replace(/^\w/, (c) => c.toUpperCase());
}
