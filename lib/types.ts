export type ProductMetadata = Record<string, string | number | boolean>;

export type ProductWithMetadata = {
  id: string;
  name: string;
  price: number;
  category: string;
  imageUrl: string | null;
  description: string | null;
  metadata: ProductMetadata;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export function parseMetadata(metadata: unknown): ProductMetadata {
  if (!metadata || typeof metadata !== "object" || Array.isArray(metadata)) {
    return {};
  }
  return metadata as ProductMetadata;
}
