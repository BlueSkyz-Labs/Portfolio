import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { productSchema } from "@/lib/product-schema";

const products = defineCollection({
  loader: glob({
    pattern: "**/*.{yaml,yml,json}",
    base: "./src/content/products",
  }),
  schema: productSchema,
});

export const collections = { products };
