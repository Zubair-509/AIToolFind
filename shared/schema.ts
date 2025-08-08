import { sql } from "drizzle-orm";
import { pgTable, text, varchar, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const recommendations = pgTable("recommendations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userInput: text("user_input").notNull(),
  tools: jsonb("tools").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
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
