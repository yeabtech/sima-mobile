import Image from "next/image";
import Link from "next/link";
import { Pencil, Plus } from "lucide-react";
import { DatabaseErrorAlert } from "@/components/admin/database-error";
import { DeleteProductButton } from "@/components/admin/delete-product-button";
import { isDatabaseConnectionError } from "@/lib/db-error";
import { prisma } from "@/lib/prisma";
import { parseMetadata } from "@/lib/types";
import { PriceDisplay } from "@/components/ui/price-display";

export const metadata = {
  title: "Admin Dashboard",
};

export default async function AdminDashboardPage() {
  let products: Awaited<ReturnType<typeof prisma.product.findMany>> = [];

  try {
    products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    if (isDatabaseConnectionError(error)) {
      return (
        <div>
          <h1 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-white">
            Products
          </h1>
          <DatabaseErrorAlert />
        </div>
      );
    }
    throw error;
  }

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-950 dark:text-white">
            Products
          </h1>
          <p className="mt-1 text-sm font-medium text-zinc-700 dark:text-zinc-400">
            {products.length} product{products.length !== 1 ? "s" : ""} in
            catalog
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-violet-700"
        >
          <Plus className="h-4 w-4" />
          Add product
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-zinc-300 px-6 py-16 text-center dark:border-zinc-700">
          <p className="text-zinc-600 dark:text-zinc-400">
            No products yet. Add your first product to get started.
          </p>
          <Link
            href="/admin/products/new"
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-violet-600"
          >
            <Plus className="h-4 w-4" />
            Add product
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="border-b border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-950">
              <tr>
                <th className="admin-table-head">Product</th>
                <th className="admin-table-head">Category</th>
                <th className="admin-table-head">Price</th>
                <th className="admin-table-head">Specs</th>
                <th className="admin-table-head">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {products.map((product) => {
                const meta = parseMetadata(product.metadata);
                const specCount = Object.keys(meta).length;
                return (
                  <tr
                    key={product.id}
                    className="hover:bg-zinc-50 dark:hover:bg-zinc-950/50"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-800">
                          {product.imageUrl ? (
                            <Image
                              src={product.imageUrl}
                              alt=""
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <span className="flex h-full items-center justify-center text-lg">
                              📱
                            </span>
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-zinc-900 dark:text-white">
                            {product.name}
                          </p>
                          {product.featured && (
                            <span className="text-xs text-amber-600">
                              Featured
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">
                      {product.category}
                    </td>
                    <td className="admin-table-cell">
                      <PriceDisplay price={product.price} size="sm" />
                    </td>
                    <td className="admin-table-cell text-zinc-500 dark:text-zinc-400">
                      {specCount} field{specCount !== 1 ? "s" : ""}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <Link
                          href={`/admin/products/${product.id}/edit`}
                          className="inline-flex items-center gap-1 rounded-lg border border-zinc-300 px-3 py-1.5 text-sm font-medium text-zinc-800 hover:bg-zinc-100 dark:border-zinc-600 dark:text-zinc-200 dark:hover:bg-zinc-800"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                          Edit
                        </Link>
                        <DeleteProductButton
                          productId={product.id}
                          productName={product.name}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
