"use client";

import Image from "next/image";
import { useActionState, useState } from "react";
import { MetadataEditor } from "@/components/admin/metadata-editor";
import { UploadButton } from "@/lib/uploadthing";
import type { ProductActionState } from "@/lib/actions/products";
import { CATEGORIES } from "@/lib/categories";
import type { ProductWithMetadata } from "@/lib/types";
import { cn } from "@/lib/utils";

type ProductFormProps = {
  product?: ProductWithMetadata;
  action: (
    prev: ProductActionState,
    formData: FormData,
  ) => Promise<ProductActionState>;
  submitLabel: string;
};

export function ProductForm({ product, action, submitLabel }: ProductFormProps) {
  const [state, formAction, pending] = useActionState(action, {});
  const [imageUrl, setImageUrl] = useState(product?.imageUrl ?? "");

  return (
    <form action={formAction} className="space-y-8">
      {state.error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/50 dark:text-red-300">
          {state.error}
        </div>
      )}

      <section className="surface-card grid gap-6 p-6 md:grid-cols-2">
        <Field label="Product name" error={state.fieldErrors?.name?.[0]}>
          <input
            name="name"
            required
            defaultValue={product?.name}
            className={inputClass}
            placeholder="Samsung Galaxy S24 Ultra"
          />
        </Field>

        <Field
          label="Price (USD — shown in ETB on the storefront)"
          error={state.fieldErrors?.price?.[0]}
        >
          <input
            name="price"
            type="number"
            step="0.01"
            min="0"
            required
            defaultValue={product?.price}
            className={inputClass}
            placeholder="999.99"
          />
        </Field>

        <Field label="Category" error={state.fieldErrors?.category?.[0]}>
          <select
            name="category"
            required
            defaultValue={product?.category}
            className={inputClass}
          >
            <option value="">Select category</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Featured product">
          <label className="flex cursor-pointer items-center gap-2 pt-2">
            <input
              type="checkbox"
              name="featured"
              defaultChecked={product?.featured}
              className="rounded border-zinc-300 text-violet-600"
            />
            <span className="text-sm text-zinc-700 dark:text-zinc-300">
              Show on homepage featured section
            </span>
          </label>
        </Field>

        <Field
          label="Description"
          className="md:col-span-2"
          error={state.fieldErrors?.description?.[0]}
        >
          <textarea
            name="description"
            rows={4}
            defaultValue={product?.description ?? ""}
            className={cn(inputClass, "resize-y")}
            placeholder="Product description…"
          />
        </Field>
      </section>

      <section className="surface-card p-6">
        <h3 className="text-heading mb-4 text-base">Product image</h3>
        <input type="hidden" name="imageUrl" value={imageUrl} />
        {imageUrl && (
          <div className="relative mb-4 aspect-video max-w-md overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-700">
            <Image
              src={imageUrl}
              alt="Product preview"
              fill
              className="object-cover"
            />
          </div>
        )}
        <UploadButton
          endpoint="productImage"
          onClientUploadComplete={(res) => {
            const url = res?.[0]?.url;
            if (url) setImageUrl(url);
          }}
          onUploadError={(error) => {
            alert(`Upload failed: ${error.message}`);
          }}
        />
        {imageUrl && (
          <button
            type="button"
            onClick={() => setImageUrl("")}
            className="mt-3 text-sm text-red-600 hover:underline"
          >
            Remove image
          </button>
        )}
      </section>

      <section className="surface-card p-6">
        <MetadataEditor initialMetadata={product?.metadata ?? {}} />
      </section>

      <button
        type="submit"
        disabled={pending}
        className="rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition hover:opacity-90 disabled:opacity-60"
      >
        {pending ? "Saving…" : submitLabel}
      </button>
    </form>
  );
}

const inputClass = "input-field";

function Field({
  label,
  children,
  className,
  error,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
  error?: string;
}) {
  return (
    <div className={className}>
      <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
        {label}
      </label>
      {children}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
