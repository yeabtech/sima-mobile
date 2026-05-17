"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CATEGORIES, CATEGORY_ICONS } from "@/lib/categories";

export function Categories() {
  return (
    <section className="bg-zinc-100 px-4 py-16 dark:bg-zinc-900/50 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-zinc-950 dark:text-white">
            Shop by category
          </h2>
          <p className="mt-2 text-base font-medium text-zinc-700 dark:text-zinc-400">
            Phones, chargers, earbuds, and more
          </p>
        </motion.div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {CATEGORIES.map((category, index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.03 }}
            >
              <Link
                href={`/products?category=${encodeURIComponent(category)}`}
                className="flex flex-col items-center gap-3 rounded-2xl border border-zinc-200 bg-white p-6 text-center shadow-sm transition hover:border-violet-400 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-violet-600"
              >
                <span className="text-3xl">{CATEGORY_ICONS[category]}</span>
                <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                  {category}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
