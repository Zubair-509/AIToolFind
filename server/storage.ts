import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { eq } from "drizzle-orm";
import { users, recommendations, type User, type InsertUser, type Recommendation, type InsertRecommendation } from "@shared/schema";
import { randomUUID } from "crypto";

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

const db = drizzle(neon(process.env.DATABASE_URL!));

export const storage = {
  // User functions
  async createUser(data: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(data).returning();
    return user;
  },

  async getUserByEmail(email: string): Promise<User | null> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || null;
  },

  async getUserById(id: string): Promise<User | null> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || null;
  },

  // Recommendation functions
  async createRecommendation(data: InsertRecommendation & { userId?: string }): Promise<Recommendation> {
    const [recommendation] = await db.insert(recommendations).values(data).returning();
    return recommendation;
  },

  async getRecommendation(id: string): Promise<Recommendation | null> {
    const [recommendation] = await db.select().from(recommendations).where(eq(recommendations.id, id));
    return recommendation || null;
  },

  async getUserRecommendations(userId: string): Promise<Recommendation[]> {
    return db.select().from(recommendations).where(eq(recommendations.userId, userId));
  },
};