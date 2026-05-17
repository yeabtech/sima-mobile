/** USD amount stored in DB → ETB using env rate (default ~128 ETB/USD). */
const DEFAULT_USD_TO_ETB = 128;

export function getUsdToEtbRate(): number {
  const raw =
    process.env.NEXT_PUBLIC_USD_TO_ETB_RATE ??
    process.env.USD_TO_ETB_RATE;
  const rate = Number(raw);
  return Number.isFinite(rate) && rate > 0 ? rate : DEFAULT_USD_TO_ETB;
}

export function usdToEtb(usd: number): number {
  return usd * getUsdToEtbRate();
}

export function formatUsd(usd: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(usd);
}

export function formatEtbFromUsd(usd: number): string {
  const etb = usdToEtb(usd);
  return new Intl.NumberFormat("en-ET", {
    style: "currency",
    currency: "ETB",
    maximumFractionDigits: 0,
  }).format(etb);
}

export type DualPrice = {
  usd: string;
  etb: string;
  usdAmount: number;
  etbAmount: number;
};

export function formatDualPrice(usdAmount: number): DualPrice {
  return {
    usdAmount,
    etbAmount: usdToEtb(usdAmount),
    usd: formatUsd(usdAmount),
    etb: formatEtbFromUsd(usdAmount),
  };
}
