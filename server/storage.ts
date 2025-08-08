import { type Recommendation, type InsertRecommendation, type AITool } from "@shared/schema";
import { randomUUID } from "crypto";
// Removed drizzle and neon imports as they are no longer needed

export interface IStorage {
  getRecommendation(id: string): Promise<Recommendation | undefined>;
  createRecommendation(recommendation: InsertRecommendation & { tools: AITool[] }): Promise<Recommendation>;
  getAllRecommendations(): Promise<Recommendation[]>;
}

// In-memory storage implementation
class MemoryStorage implements IStorage {
  private recommendations: Map<string, Recommendation> = new Map();

  async getRecommendation(id: string): Promise<Recommendation | undefined> {
    return this.recommendations.get(id);
  }

  async createRecommendation(recommendation: InsertRecommendation & { tools: AITool[] }): Promise<Recommendation> {
    const id = randomUUID();
    const newRecommendation: Recommendation = {
      id,
      tools: recommendation.tools,
      created_at: new Date().toISOString(),
      user_input: recommendation.user_input,
    };
    
    this.recommendations.set(id, newRecommendation);
    return newRecommendation;
  }

  async getAllRecommendations(): Promise<Recommendation[]> {
    return Array.from(this.recommendations.values()).sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  }
}

export const storage = new MemoryStorage();