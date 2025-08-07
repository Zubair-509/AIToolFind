import { type Recommendation, type InsertRecommendation, type AITool } from "@shared/schema";
import { randomUUID } from "crypto";
import { neon } from '@neondatabase/serverless';

export interface IStorage {
  getRecommendation(id: string): Promise<Recommendation | undefined>;
  createRecommendation(recommendation: InsertRecommendation & { tools: AITool[] }): Promise<Recommendation>;
}

export class MemStorage implements IStorage {
  private recommendations: Map<string, Recommendation>;

  constructor() {
    this.recommendations = new Map();
  }

  async getRecommendation(id: string): Promise<Recommendation | undefined> {
    return this.recommendations.get(id);
  }

  async createRecommendation(insertRecommendation: InsertRecommendation & { tools: AITool[] }): Promise<Recommendation> {
    const id = randomUUID();
    const recommendation: Recommendation = {
      ...insertRecommendation,
      id,
      tools: insertRecommendation.tools as any, // jsonb type
      createdAt: new Date(),
    };
    this.recommendations.set(id, recommendation);
    return recommendation;
  }
}

// Railway provides DATABASE_URL automatically
const databaseUrl = process.env.DATABASE_URL;
if (databaseUrl) {
  const sql = neon(databaseUrl);
  // TODO: Implement PostgreSQL storage when deploying to production
}

export const storage = new MemStorage();