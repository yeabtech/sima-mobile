import { Prisma } from "@prisma/client";

export function isDatabaseConnectionError(error: unknown): boolean {
  if (error instanceof Prisma.PrismaClientInitializationError) {
    return true;
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    const code = String(error.code);
    if (
      code === "ECONNREFUSED" ||
      code === "P1001" ||
      code === "P1017" ||
      code === "P1000"
    ) {
      return true;
    }
  }

  const message =
    error instanceof Error
      ? `${error.message} ${error.cause instanceof Error ? error.cause.message : ""}`
      : String(error);

  return /ECONNREFUSED|Can't reach database|Connection terminated|connect ECONNREFUSED/i.test(
    message,
  );
}

export function getDatabaseErrorMessage(): {
  title: string;
  steps: string[];
} {
  return {
    title: "Database not connected",
    steps: [
      "Start PostgreSQL (e.g. open pgAdmin, Docker, or Windows Services → postgresql-x64).",
      "Confirm DATABASE_URL in .env points to your running server.",
      "Run: npm run db:push",
      "Run: npm run db:seed (optional sample products)",
      "Restart the dev server: npm run dev",
    ],
  };
}
