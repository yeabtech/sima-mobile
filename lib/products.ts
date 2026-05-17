import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { parseMetadata, type ProductWithMetadata } from "@/lib/types";

function mapProduct(product: {
  id: string;
  name: string;
  price: number;
  category: string;
  imageUrl: string | null;
  description: string | null;
  metadata: unknown;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}): ProductWithMetadata {
  return {
    ...product,
    metadata: parseMetadata(product.metadata),
  };
}

export type ProductFilters = {
  q?: string;
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  featured?: boolean;
  page?: number;
  pageSize?: number;
};

export type ProductsResult = {
  products: ProductWithMetadata[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

export async function getProducts(
  filters: ProductFilters = {},
): Promise<ProductsResult> {
  const page = Math.max(1, filters.page ?? 1);
  const pageSize = filters.pageSize ?? 12;
  const skip = (page - 1) * pageSize;

  const and: Prisma.ProductWhereInput[] = [];

  if (filters.q?.trim()) {
    const q = filters.q.trim();
    and.push({
      OR: [
        { name: { contains: q, mode: "insensitive" } },
        { description: { contains: q, mode: "insensitive" } },
        { category: { contains: q, mode: "insensitive" } },
      ],
    });
  }

  if (filters.category) {
    and.push({ category: filters.category });
  }

  if (filters.brand) {
    and.push({
      metadata: {
        path: ["brand"],
        equals: filters.brand,
      },
    });
  }

  if (filters.featured) {
    and.push({ featured: true });
  }

  if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
    and.push({
      price: {
        ...(filters.minPrice !== undefined ? { gte: filters.minPrice } : {}),
        ...(filters.maxPrice !== undefined ? { lte: filters.maxPrice } : {}),
      },
    });
  }

  const where: Prisma.ProductWhereInput =
    and.length > 0 ? { AND: and } : {};

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take: pageSize,
    }),
    prisma.product.count({ where }),
  ]);

  return {
    products: products.map(mapProduct),
    total,
    page,
    pageSize,
    totalPages: Math.max(1, Math.ceil(total / pageSize)),
  };
}

export async function getProductById(
  id: string,
): Promise<ProductWithMetadata | null> {
  const product = await prisma.product.findUnique({ where: { id } });
  return product ? mapProduct(product) : null;
}

export async function getLatestProducts(
  limit = 8,
): Promise<ProductWithMetadata[]> {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    take: limit,
  });
  return products.map(mapProduct);
}

export async function getFeaturedProducts(
  limit = 8,
): Promise<ProductWithMetadata[]> {
  const products = await prisma.product.findMany({
    where: { featured: true },
    orderBy: { createdAt: "desc" },
    take: limit,
  });
  return products.map(mapProduct);
}

export async function getDistinctBrands(): Promise<string[]> {
  const products = await prisma.product.findMany({
    select: { metadata: true },
  });
  const brands = new Set<string>();
  for (const product of products) {
    const meta = parseMetadata(product.metadata);
    if (typeof meta.brand === "string" && meta.brand.trim()) {
      brands.add(meta.brand.trim());
    }
  }
  return Array.from(brands).sort((a, b) => a.localeCompare(b));
}

export async function getPriceBounds(): Promise<{
  min: number;
  max: number;
}> {
  const result = await prisma.product.aggregate({
    _min: { price: true },
    _max: { price: true },
  });
  return {
    min: result._min.price ?? 0,
    max: result._max.price ?? 1000,
  };
}

export async function getRelatedProducts(
  product: ProductWithMetadata,
  limit = 4,
): Promise<ProductWithMetadata[]> {
  const products = await prisma.product.findMany({
    where: {
      category: product.category,
      id: { not: product.id },
    },
    orderBy: { createdAt: "desc" },
    take: limit,
  });
  return products.map(mapProduct);
}
