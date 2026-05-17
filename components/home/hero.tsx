"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background px-4 pb-16 pt-12 sm:px-6 lg:px-8 lg:pb-24 lg:pt-16">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-0 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl dark:bg-violet-500/10"
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl dark:bg-indigo-500/10"
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-300 bg-violet-100 px-4 py-1.5 text-sm font-semibold text-violet-900 dark:border-violet-800 dark:bg-violet-950/50 dark:text-violet-200">
            <Sparkles className="h-4 w-4 text-violet-700 dark:text-violet-300" />
            Your mobile marketplace
          </span>
          <h1 className="text-4xl font-bold tracking-tight text-zinc-950 sm:text-5xl lg:text-6xl dark:text-white">
            <span className="text-zinc-950 dark:text-white">
              Discover phones & accessories with{" "}
            </span>
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
              real specs
            </span>
          </h1>
          <p className="mt-6 text-lg font-medium leading-relaxed text-zinc-700 dark:text-zinc-300">
            Sima Mobile brings detailed product information — prices, model
            numbers, and flexible specifications for every device type.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/30 transition hover:opacity-90"
            >
              Browse products
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/products?category=Smartphones" className="btn-secondary">
              Shop phones
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
