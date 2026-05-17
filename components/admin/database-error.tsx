import { Database } from "lucide-react";
import { getDatabaseErrorMessage } from "@/lib/db-error";

export function DatabaseErrorAlert() {
  const { title, steps } = getDatabaseErrorMessage();

  return (
    <div
      role="alert"
      className="rounded-2xl border border-amber-200 bg-amber-50 p-6 dark:border-amber-900/50 dark:bg-amber-950/30"
    >
      <div className="flex gap-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300">
          <Database className="h-5 w-5" />
        </span>
        <div>
          <h2 className="font-semibold text-amber-900 dark:text-amber-100">
            {title}
          </h2>
          <p className="mt-1 text-sm text-amber-800/90 dark:text-amber-200/80">
            Prisma could not reach PostgreSQL (connection refused). Follow these
            steps:
          </p>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-amber-900 dark:text-amber-100">
            {steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
