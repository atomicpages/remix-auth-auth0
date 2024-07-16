import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      all: true,
      enabled: true,
    },
    setupFiles: ["./vitest-setup.ts"],
  },
});
