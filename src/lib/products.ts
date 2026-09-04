import { getCollection, type CollectionEntry } from "astro:content";

export type ProductEntry = CollectionEntry<"products">;

export async function getPublicProducts(): Promise<ProductEntry[]> {
  const products = await getCollection(
    "products",
    (entry: ProductEntry) => entry.data.public,
  );
  return products.sort(
    (a: ProductEntry, b: ProductEntry) =>
      a.data.displayOrder - b.data.displayOrder,
  );
}

export async function getFlagshipProduct(): Promise<ProductEntry | null> {
  return (
    (await getPublicProducts()).find(
      (entry: ProductEntry) => entry.data.featuredTier === "hero",
    ) ?? null
  );
}
