"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { productSchema } from "@/lib/validations/product";

function parseMetadataJson(raw: string) {
  try {
    const parsed = JSON.parse(raw || "{}");
    if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
      return {};
    }
    return parsed as Record<string, string | number | boolean>;
  } catch {
    return {};
  }
}

export type ProductActionState = {
  error?: string;
  fieldErrors?: Record<string, string[]>;
};

export async function createProduct(
  _prev: ProductActionState,
  formData: FormData,
): Promise<ProductActionState> {
  const auth = await requireAdmin();
  if (!auth.authorized) {
    return { error: "Unauthorized" };
  }

  const parsed = productSchema.safeParse({
    name: formData.get("name"),
    price: formData.get("price"),
    category: formData.get("category"),
    description: formData.get("description") || undefined,
    imageUrl: formData.get("imageUrl") || "",
    featured: formData.get("featured") === "on",
    metadata: parseMetadataJson(String(formData.get("metadata") ?? "{}")),
  });

  if (!parsed.success) {
    return {
      error: "Please fix the errors below.",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<
        string,
        string[]
      >,
    };
  }

  const data = parsed.data;
  const product = await prisma.product.create({
    data: {
      name: data.name,
      price: data.price,
      category: data.category,
      description: data.description || null,
      imageUrl: data.imageUrl || null,
      featured: data.featured,
      metadata: data.metadata,
    },
  });

  revalidatePath("/");
  revalidatePath("/products");
  revalidatePath("/admin");
  redirect(`/admin/products/${product.id}/edit?created=1`);
}

export async function updateProduct(
  id: string,
  _prev: ProductActionState,
  formData: FormData,
): Promise<ProductActionState> {
  const auth = await requireAdmin();
  if (!auth.authorized) {
    return { error: "Unauthorized" };
  }

  const parsed = productSchema.safeParse({
    name: formData.get("name"),
    price: formData.get("price"),
    category: formData.get("category"),
    description: formData.get("description") || undefined,
    imageUrl: formData.get("imageUrl") || "",
    featured: formData.get("featured") === "on",
    metadata: parseMetadataJson(String(formData.get("metadata") ?? "{}")),
  });

  if (!parsed.success) {
    return {
      error: "Please fix the errors below.",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<
        string,
        string[]
      >,
    };
  }

  const data = parsed.data;
  await prisma.product.update({
    where: { id },
    data: {
      name: data.name,
      price: data.price,
      category: data.category,
      description: data.description || null,
      imageUrl: data.imageUrl || null,
      featured: data.featured,
      metadata: data.metadata,
    },
  });

  revalidatePath("/");
  revalidatePath("/products");
  revalidatePath(`/products/${id}`);
  revalidatePath("/admin");
  revalidatePath(`/admin/products/${id}/edit`);

  return { error: undefined };
}

export async function deleteProduct(id: string) {
  const auth = await requireAdmin();
  if (!auth.authorized) {
    return { error: "Unauthorized" };
  }

  await prisma.product.delete({ where: { id } });

  revalidatePath("/");
  revalidatePath("/products");
  revalidatePath("/admin");

  redirect("/admin");
}
