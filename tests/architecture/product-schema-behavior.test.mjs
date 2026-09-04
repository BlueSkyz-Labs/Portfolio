import assert from "node:assert/strict";
import test from "node:test";
import {
  isPublicClaimHttpsUrl,
  productSchema,
} from "../../src/lib/product-schema.ts";

function baseProduct(overrides = {}) {
  return {
    slug: "demo-product",
    name: "Demo Product",
    shortDescription: "A truthful demo product entry for schema probes.",
    lifecycle: "active",
    availability: "public",
    publicLabel: "Available",
    audience: ["individual"],
    jobs: ["Understand status"],
    capabilities: ["Shows status", "Links to proof"],
    platforms: ["web"],
    primaryAction: {
      type: "open",
      label: "Open product",
      href: "https://product.blueskyz.labs/",
    },
    proof: {
      publicUrl: "https://product.blueskyz.labs/",
    },
    endorsement: "A BlueSkyz Labs product",
    featuredTier: "featured",
    displayOrder: 1,
    public: true,
    sourceRevision: "abcdef1",
    lastReviewedAt: "2026-09-04",
    ...overrides,
  };
}

test("isPublicClaimHttpsUrl rejects preview and documentation hosts", () => {
  assert.equal(isPublicClaimHttpsUrl("https://product.blueskyz.labs/"), true);
  assert.equal(
    isPublicClaimHttpsUrl("https://blueskyz-web.thinhnguyen-km10.workers.dev/"),
    false,
  );
  assert.equal(isPublicClaimHttpsUrl("https://localhost/app"), false);
  assert.equal(isPublicClaimHttpsUrl("https://127.0.0.1/app"), false);
  assert.equal(isPublicClaimHttpsUrl("https://example.com/app"), false);
  assert.equal(isPublicClaimHttpsUrl("http://product.blueskyz.labs/"), false);
});

test("public product rejects private availability", () => {
  const result = productSchema.safeParse(
    baseProduct({ availability: "private" }),
  );
  assert.equal(result.success, false);
  const messages = result.success
    ? []
    : result.error.issues.map((issue) => issue.message);
  assert.ok(
    messages.some((message) =>
      message.includes("public product cannot have private availability"),
    ),
  );
});

test("non-public draft may use private availability", () => {
  const result = productSchema.safeParse(
    baseProduct({
      public: false,
      availability: "private",
      publicLabel: "In development",
      lifecycle: "development",
      capabilities: undefined,
    }),
  );
  assert.equal(result.success, true);
});

test("public product rejects incoherent publicLabel vs lifecycle", () => {
  const result = productSchema.safeParse(
    baseProduct({
      publicLabel: "Available",
      lifecycle: "concept",
      availability: "public",
    }),
  );
  assert.equal(result.success, false);
  const messages = result.success
    ? []
    : result.error.issues.map((issue) => issue.message);
  assert.ok(
    messages.some((message) =>
      /publicLabel Available is incoherent with lifecycle concept/.test(
        message,
      ),
    ),
  );
});

test("public product rejects workers.dev claim URLs", () => {
  const result = productSchema.safeParse(
    baseProduct({
      primaryAction: {
        type: "open",
        label: "Open product",
        href: "https://demo.workers.dev/",
      },
      proof: {
        publicUrl: "https://demo.workers.dev/",
      },
    }),
  );
  assert.equal(result.success, false);
});

test("coherent public Available product parses", () => {
  const result = productSchema.safeParse(baseProduct());
  assert.equal(result.success, true);
});
