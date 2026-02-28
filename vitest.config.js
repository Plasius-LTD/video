import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    include: [
      "tests/**/*.test.ts",
      "tests/**/*.tests.ts",
      "tests/**/*.test.tsx",
      "tests/**/*.tests.tsx",
    ],
    passWithNoTests: false,
    coverage: {
      include: ["src/**/*.ts", "src/**/*.tsx"],
      reporter: ["text", "json", "html", "lcov"],
      exclude: ["**/node_modules/**", "dist", "**/types/**"],
      thresholds: {
        lines: 80,
        functions: 80,
        statements: 80,
        branches: 70,
      },
    },
  },
});
