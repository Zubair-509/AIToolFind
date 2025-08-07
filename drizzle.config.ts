import { defineConfig } from "drizzle-kit";

// Database configuration removed - using in-memory storage only
export default defineConfig({
  out: "./migrations",
  schema: "./shared/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://placeholder",
  },
});
