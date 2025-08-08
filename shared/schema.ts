
import { z } from "zod";

// AI Tool schema for recommendations
export const aiToolSchema = z.object({
  tool_name: z.string(),
  purpose: z.string(),
  pros: z.array(z.string()),
  cons: z.array(z.string()),
  pricing: z.enum(["Free", "Freemium", "Paid"]),
  why_fit: z.string(),
});

export type AITool = z.infer<typeof aiToolSchema>;

// Schema for validating AI recommendations response
export const recommendationsResponseSchema = z.array(aiToolSchema);

// Recommendation types for storage (simplified since no database)
export interface Recommendation {
  id: string;
  tools: AITool[];
  created_at: string;
  user_input: string;
}

export interface InsertRecommendation {
  user_input: string;
}
