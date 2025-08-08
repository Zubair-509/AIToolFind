import { type Recommendation, type InsertRecommendation, type AITool } from "@shared/schema";
import { randomUUID } from "crypto";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { recommendations } from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  getRecommendation(id: string): Promise<Recommendation | undefined>;
  createRecommendation(recommendation: InsertRecommendation & { tools: AITool[]; userId?: string }): Promise<Recommendation>;
  getUserRecommendations(userId: string): Promise<Recommendation[]>;
}

// Supabase/Neon Database Storage
export class DatabaseStorage implements IStorage {
  private db: ReturnType<typeof drizzle>;

  constructor() {
    if (process.env.DATABASE_URL) {
      const sql = neon(process.env.DATABASE_URL);
      this.db = drizzle(sql);
    } else {
      throw new Error('DATABASE_URL environment variable is required');
    }
  }

  async getRecommendation(id: string): Promise<Recommendation | undefined> {
    try {
      const result = await this.db
        .select()
        .from(recommendations)
        .where(eq(recommendations.id, id))
        .limit(1);
      
      return result[0];
    } catch (error) {
      console.error('Error fetching recommendation:', error);
      return undefined;
    }
  }

  async createRecommendation(insertRecommendation: InsertRecommendation & { tools: AITool[]; userId?: string }): Promise<Recommendation> {
    const id = randomUUID();
    const recommendation: Recommendation = {
      id,
      userInput: insertRecommendation.userInput,
      tools: insertRecommendation.tools as any, // jsonb type
      createdAt: new Date(),
    };

    try {
      await this.db.insert(recommendations).values({
        id,
        userInput: insertRecommendation.userInput,
        tools: insertRecommendation.tools as any,
        // Add user_id if provided (for authenticated users)
        ...(insertRecommendation.userId && { user_id: insertRecommendation.userId }),
      });
      
      return recommendation;
    } catch (error) {
      console.error('Error creating recommendation:', error);
      throw error;
    }
  }

  async getUserRecommendations(userId: string): Promise<Recommendation[]> {
    try {
      const result = await this.db
        .select()
        .from(recommendations)
        .where(eq(recommendations.user_id, userId))
        .orderBy(recommendations.createdAt);
      
      return result;
    } catch (error) {
      console.error('Error fetching user recommendations:', error);
      return [];
    }
  }
}
export class MemStorage implements IStorage {
  private recommendations: Map<string, Recommendation>;

  constructor() {
    this.recommendations = new Map();
  }

  async getRecommendation(id: string): Promise<Recommendation | undefined> {
    return this.recommendations.get(id);
  }

  async createRecommendation(insertRecommendation: InsertRecommendation & { tools: AITool[]; userId?: string }): Promise<Recommendation> {
    const id = randomUUID();
    const recommendation: Recommendation = {
      id,
      userInput: insertRecommendation.userInput,
      tools: insertRecommendation.tools as any, // jsonb type
      createdAt: new Date(),
    };
    this.recommendations.set(id, recommendation);
    return recommendation;
  }

  async getUserRecommendations(userId: string): Promise<Recommendation[]> {
    // For memory storage, we can't filter by user ID effectively
    // This is just a placeholder implementation
    return Array.from(this.recommendations.values());
  }
}

// Use database storage if DATABASE_URL is available, otherwise fallback to memory
export const storage: IStorage = process.env.DATABASE_URL 
  ? new DatabaseStorage() 
  : new MemStorage();