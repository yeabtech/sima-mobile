import { formatDualPrice } from "@/lib/currency";
import { cn } from "@/lib/utils";

type PriceDisplayProps = {
  /** Price in USD (as stored in the database). */
  price: number;
  size?: "sm" | "md" | "lg";
  layout?: "stack" | "inline";
  className?: string;
  primaryClassName?: string;
  secondaryClassName?: string;
};

const sizeStyles = {
  sm: {
    primary: "text-base font-bold",
    secondary: "text-xs font-medium",
  },
  md: {
    primary: "text-lg font-bold",
    secondary: "text-sm font-medium",
  },
  lg: {
    primary: "text-3xl font-bold",
    secondary: "text-base font-medium",
  },
};

export function PriceDisplay({
  price,
  size = "md",
  layout = "stack",
  className,
  primaryClassName,
  secondaryClassName,
}: PriceDisplayProps) {
  const { usd, etb } = formatDualPrice(price);
  const styles = sizeStyles[size];

  if (layout === "inline") {
    return (
      <p
        className={cn(
          "flex flex-wrap items-baseline gap-x-2 gap-y-0.5",
          className,
        )}
      >
        <span
          className={cn(
            styles.primary,
            "text-zinc-950 dark:text-white",
            primaryClassName,
          )}
        >
          {usd}
        </span>
        <span
          className={cn(
            styles.secondary,
            "text-zinc-600 dark:text-zinc-400",
            secondaryClassName,
          )}
        >
          ({etb})
        </span>
      </p>
    );
  }

  return (
    <p
      className={cn("flex flex-col gap-0.5", className)}
      aria-label={`${usd}, ${etb}`}
    >
      <span
        className={cn(
          styles.primary,
          "text-zinc-950 dark:text-white",
          primaryClassName,
        )}
      >
        {usd}
      </span>
      <span
        className={cn(
          styles.secondary,
          "text-violet-700 dark:text-violet-400",
          secondaryClassName,
        )}
      >
        {etb}
      </span>
    </p>
  );
}
