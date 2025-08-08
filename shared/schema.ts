import { sql } from "drizzle-orm";
import { pgTable, text, varchar, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const recommendations = pgTable("recommendations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  user_id: varchar("user_id"), // References auth.users(id) in Supabase
  userInput: text("user_input").notNull(),
  tools: jsonb("tools").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const profiles = pgTable("profiles", {
  id: varchar("id").primaryKey(), // References auth.users(id) in Supabase
  email: text("email").unique().notNull(),
  full_name: text("full_name"),
  avatar_url: text("avatar_url"),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});
export const insertRecommendationSchema = createInsertSchema(recommendations).pick({
  userInput: true,
});

export const aiToolSchema = z.object({
  tool_name: z.string(),
  purpose: z.string(),
  pros: z.array(z.string()),
  cons: z.array(z.string()),
  pricing: z.enum(["Free", "Freemium", "Paid"]),
  why_fit: z.string(),
});

export const recommendationsResponseSchema = z.array(aiToolSchema);

export type InsertRecommendation = z.infer<typeof insertRecommendationSchema>;
export type Recommendation = typeof recommendations.$inferSelect;
export type AITool = z.infer<typeof aiToolSchema>;
