import { Categories } from "@/components/home/categories";
import { Hero } from "@/components/home/hero";
import { ProductSection } from "@/components/home/product-section";
import { getFeaturedProducts, getLatestProducts } from "@/lib/products";

export default async function HomePage() {
  let featured: Awaited<ReturnType<typeof getFeaturedProducts>> = [];
  let latest: Awaited<ReturnType<typeof getLatestProducts>> = [];

  try {
    [featured, latest] = await Promise.all([
      getFeaturedProducts(4),
      getLatestProducts(4),
    ]);
  } catch {
    // Database not configured yet — homepage still renders
  }

  return (
    <>
      <Hero />
      <ProductSection
        title="Featured products"
        subtitle="Hand-picked deals and top sellers"
        products={featured}
        viewAllHref="/products?featured=true"
      />
      <Categories />
      <ProductSection
        title="Latest arrivals"
        subtitle="Newly added to the catalog"
        products={latest}
      />
    </>
  );
}
