"use client";

import {
  Show,
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { Menu, Smartphone, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { ADMIN_ROLE } from "@/lib/constants";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white text-zinc-950 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold tracking-tight text-zinc-950 dark:text-zinc-50"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/25">
            <Smartphone className="h-4 w-4" />
          </span>
          <span className="hidden sm:inline">Sima Mobile</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-zinc-700 hover:text-violet-700 dark:text-zinc-300 dark:hover:text-violet-400"
            >
              {link.label}
            </Link>
          ))}
          <AdminNavLink />
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Show when="signed-out">
            <SignInButton mode="modal">
              <button
                type="button"
                className="hidden rounded-full px-4 py-2 text-sm font-semibold text-zinc-800 hover:text-violet-700 sm:inline dark:text-zinc-200 dark:hover:text-violet-400"
              >
                Sign in
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button
                type="button"
                className="hidden rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-violet-500/30 transition hover:opacity-90 sm:inline"
              >
                Sign up
              </button>
            </SignUpButton>
          </Show>
          <Show when="signed-in">
            <UserButton
              appearance={{
                elements: { avatarBox: "h-9 w-9" },
              }}
            />
          </Show>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-300 text-zinc-800 md:hidden dark:border-zinc-600 dark:text-zinc-200"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="border-t border-zinc-200 bg-white px-4 py-4 md:hidden dark:border-zinc-800 dark:bg-zinc-950">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-semibold text-zinc-800 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-900"
              >
                {link.label}
              </Link>
            ))}
            <AdminNavLink mobile onNavigate={() => setMobileOpen(false)} />
            <Show when="signed-out">
              <div className="flex gap-2 pt-2">
                <SignInButton mode="modal">
                  <button
                    type="button"
                    className="flex-1 rounded-full border border-zinc-300 py-2 text-sm font-semibold text-zinc-900 dark:border-zinc-600 dark:text-zinc-200"
                  >
                    Sign in
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button
                    type="button"
                    className="flex-1 rounded-full bg-violet-600 py-2 text-sm font-semibold text-white"
                  >
                    Sign up
                  </button>
                </SignUpButton>
              </div>
            </Show>
          </div>
        </nav>
      )}
    </header>
  );
}

function AdminNavLink({
  mobile,
  onNavigate,
}: {
  mobile?: boolean;
  onNavigate?: () => void;
}) {
  const { isSignedIn, user } = useUser();
  const isAdmin =
    isSignedIn &&
    (user?.publicMetadata as { role?: string } | undefined)?.role ===
      ADMIN_ROLE;

  if (!isAdmin) return null;

  return (
    <Link
      href="/admin"
      onClick={onNavigate}
      className={cn(
        "text-sm font-semibold text-violet-700 dark:text-violet-400",
        mobile && "rounded-lg px-3 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-900",
      )}
    >
      Admin
    </Link>
  );
}
