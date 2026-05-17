"use client";

import {
  LayoutDashboard,
  Package,
  Plus,
  Smartphone,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  {
    href: "/admin/products/new",
    label: "Add product",
    icon: Plus,
    exact: false,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-full flex-col border-b border-zinc-200 bg-white text-zinc-950 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 lg:w-64 lg:border-b-0 lg:border-r lg:min-h-[calc(100vh-4rem)]">
      <div className="flex items-center gap-2 border-b border-zinc-200 px-5 py-4 dark:border-zinc-800">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white">
          <Smartphone className="h-4 w-4" />
        </span>
        <div>
          <p className="text-sm font-bold text-zinc-950 dark:text-zinc-50">
            Sima Admin
          </p>
          <p className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
            Product management
          </p>
        </div>
      </div>
      <nav className="flex gap-1 overflow-x-auto p-3 lg:flex-col">
        {links.map(({ href, label, icon: Icon, exact }) => {
          const active = exact
            ? pathname === href
            : pathname === href || pathname.startsWith(`${href}/`);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-2 whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-semibold transition",
                active
                  ? "bg-violet-100 text-violet-800 dark:bg-violet-950 dark:text-violet-300"
                  : "text-zinc-800 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900",
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          );
        })}
        <Link
          href="/products"
          className="flex items-center gap-2 whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-semibold text-zinc-800 hover:bg-zinc-100 lg:mt-auto dark:text-zinc-300 dark:hover:bg-zinc-900"
        >
          <Package className="h-4 w-4" />
          View storefront
        </Link>
      </nav>
    </aside>
  );
}
