import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductForm } from "@/components/admin/product-form";
import { updateProduct } from "@/lib/actions/products";
import { getProductById } from "@/lib/products";

type EditProductPageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ created?: string }>;
};

export async function generateMetadata({ params }: EditProductPageProps) {
  const { id } = await params;
  const product = await getProductById(id);
  return { title: product ? `Edit ${product.name}` : "Edit product" };
}

export default async function EditProductPage({
  params,
  searchParams,
}: EditProductPageProps) {
  const { id } = await params;
  const { created } = await searchParams;
  const product = await getProductById(id);

  if (!product) notFound();

  const boundUpdate = updateProduct.bind(null, id);

  return (
    <div>
      <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
            Edit product
          </h1>
          <p className="text-sm text-zinc-500">{product.name}</p>
        </div>
        <Link
          href={`/products/${product.id}`}
          className="text-sm font-medium text-violet-600 hover:underline"
          target="_blank"
        >
          View on storefront →
        </Link>
      </div>

      {created === "1" && (
        <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800 dark:border-green-900 dark:bg-green-950/40 dark:text-green-300">
          Product created successfully. You can continue editing below.
        </div>
      )}

      <ProductForm
        product={product}
        action={boundUpdate}
        submitLabel="Save changes"
      />
    </div>
  );
}
