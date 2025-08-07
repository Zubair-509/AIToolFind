import { sql } from "drizzle-orm";
import { pgTable, text, varchar, jsonb, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: text("password").notNull(),
  emailVerified: boolean("email_verified").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const recommendations = pgTable("recommendations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  userInput: text("user_input").notNull(),
  tools: jsonb("tools").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  name: true,
  email: true,
  password: true,
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

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertRecommendation = z.infer<typeof insertRecommendationSchema>;
export type Recommendation = typeof recommendations.$inferSelect;
export type AITool = z.infer<typeof aiToolSchema>;
