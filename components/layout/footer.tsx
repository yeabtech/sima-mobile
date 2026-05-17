import { Smartphone } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-zinc-100 text-zinc-950 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-12 sm:px-6 lg:px-8 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white">
            <Smartphone className="h-4 w-4" />
          </span>
          <div>
            <p className="font-bold text-zinc-950 dark:text-zinc-50">
              Sima Mobile
            </p>
            <p className="text-sm font-medium text-zinc-700 dark:text-zinc-400">
              Phones & accessories, detailed specs.
            </p>
          </div>
        </div>
        <nav className="flex flex-wrap gap-6 text-sm font-semibold text-zinc-800 dark:text-zinc-400">
          <Link
            href="/products"
            className="hover:text-violet-700 dark:hover:text-violet-400"
          >
            Products
          </Link>
          <Link
            href="/products?category=Smartphones"
            className="hover:text-violet-700 dark:hover:text-violet-400"
          >
            Smartphones
          </Link>
          <Link
            href="/products?category=Earbuds"
            className="hover:text-violet-700 dark:hover:text-violet-400"
          >
            Earbuds
          </Link>
        </nav>
        <p className="text-sm font-medium text-zinc-700 dark:text-zinc-500">
          © {new Date().getFullYear()} Sima Mobile. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
