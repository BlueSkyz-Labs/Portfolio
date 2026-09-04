import eslintPluginAstro from "eslint-plugin-astro";
import tseslint from "typescript-eslint";

export default [
  {
    ignores: [
      "dist/**",
      ".astro/**",
      ".next/**",
      "out/**",
      "node_modules/**",
      "playwright-report/**",
      "test-results/**",
      ".lighthouseci/**",
      "next-env.d.ts",
    ],
  },
  ...tseslint.configs.recommended,
  ...eslintPluginAstro.configs["flat/recommended"],
];
