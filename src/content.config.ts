import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const lifecycle = z.enum([
  "concept",
  "prototype",
  "development",
  "beta",
  "active",
  "maintenance",
  "sunset",
  "archived",
]);

const availability = z.enum([
  "private",
  "waitlist",
  "preview",
  "public",
  "invite-only",
  "unavailable",
]);

const publicLabel = z.enum([
  "Preview",
  "In development",
  "Beta",
  "Available",
  "Sunsetting",
  "Archived",
]);

const platform = z.enum(["web", "android", "ios", "macos", "windows", "api"]);

const audience = z.enum([
  "individual",
  "professional",
  "team",
  "business",
  "organization",
]);

const actionType = z.enum([
  "open",
  "try",
  "explore",
  "preview",
  "waitlist",
  "get-started",
  "github",
  "contact",
]);

const action = z.object({
  type: actionType,
  label: z.string().min(1).max(40),
  href: z.url(),
});

const productSchema = z
  .object({
    slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    name: z.string().min(1),
    shortDescription: z.string().min(1).max(180),
    lifecycle,
    availability,
    publicLabel,
    audience: z.array(audience).min(1),
    jobs: z.array(z.string().min(1)).min(1),
    platforms: z.array(platform).min(1),
    primaryAction: action,
    secondaryAction: action.optional(),
    proof: z
      .object({
        screenshot: z.string().optional(),
        publicUrl: z.url().optional(),
        repositoryUrl: z.url().optional(),
        documentationUrl: z.url().optional(),
        privacyUrl: z.url().optional(),
        securityUrl: z.url().optional(),
        supportUrl: z.url().optional(),
      })
      .refine(
        (value) => Object.values(value).some(Boolean),
        "public product requires at least one proof artifact",
      ),
    endorsement: z.literal("A BlueSkyz Labs product"),
    featuredTier: z.enum(["hero", "featured", "ecosystem", "hidden"]),
    displayOrder: z.number().int().nonnegative(),
    public: z.boolean(),
    sourceRevision: z.string().regex(/^[0-9a-f]{7,40}$/),
    lastReviewedAt: z.coerce.date(),
  })
  .superRefine((value, ctx) => {
    if (
      value.lifecycle === "development" &&
      value.primaryAction.type === "try"
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["primaryAction", "type"],
        message: "development product cannot claim Try",
      });
    }
  });

const products = defineCollection({
  loader: glob({
    pattern: "**/*.{yaml,yml,json}",
    base: "./src/content/products",
  }),
  schema: productSchema,
});

export const collections = { products };
