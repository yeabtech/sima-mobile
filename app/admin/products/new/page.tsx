import { ProductForm } from "@/components/admin/product-form";
import { createProduct } from "@/lib/actions/products";

export const metadata = {
  title: "Add Product",
};

export default function NewProductPage() {
  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold text-zinc-900 dark:text-white">
        Add product
      </h1>
      <ProductForm action={createProduct} submitLabel="Create product" />
    </div>
  );
}
