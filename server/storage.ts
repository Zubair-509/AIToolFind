import { type Recommendation, type InsertRecommendation, type AITool } from "@shared/schema";
import { randomUUID } from "crypto";
// Removed drizzle and neon imports as they are no longer needed

export interface IStorage {
  getRecommendation(id: string): Promise<Recommendation | undefined>;
  createRecommendation(recommendation: InsertRecommendation & { tools: AITool[] }): Promise<Recommendation>;
  getAllRecommendations(): Promise<Recommendation[]>;
}

// Storage removed - no longer using database
export const storage = null;