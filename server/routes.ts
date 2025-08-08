import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { AIService } from "./services/ai-providers";
import { insertRecommendationSchema } from "@shared/schema";
import { z } from "zod";
import { nanoid } from "nanoid";
import { GeminiProvider } from "./services/ai-providers";
import jwt from 'jsonwebtoken';

// Middleware to extract user ID from Supabase JWT (optional)
const extractUserId = (req: any) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  try {
    const token = authHeader.substring(7);
    // Note: In production, you should verify the JWT with Supabase's public key
    const decoded = jwt.decode(token) as any;
    return decoded?.sub || null;
  } catch (error) {
    return null;
  }
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Initialize AI service
  const aiService = new AIService();

  // Get AI tool recommendations
  app.post("/api/recommendations", async (req, res) => {
    try {
      const { userInput } = insertRecommendationSchema.parse(req.body);

      if (!userInput.trim()) {
        return res.status(400).json({ message: "Business description is required" });
      }

      // Get preferred provider from request (default to auto)
      const preferredProvider = req.body.preferredProvider || "auto";

      // Extract user ID if authenticated
      const userId = extractUserId(req);

      // Get AI recommendations using available providers
      const { tools, usedProvider } = await aiService.generateRecommendations(userInput, preferredProvider);

      // Store the recommendation
      const recommendation = await storage.createRecommendation({
        userInput,
        tools,
        userId,
      });

      res.json({
        id: recommendation.id,
        tools: recommendation.tools,
        usedProvider,
      });
    } catch (error) {
      console.error("Error getting recommendations:", error);
      res.status(500).json({ 
        message: "Failed to get AI recommendations. Please try again." 
      });
    }
  });

  // Get recommendation by ID
  app.get("/api/recommendations/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const recommendation = await storage.getRecommendation(id);

      if (!recommendation) {
        return res.status(404).json({ message: "Recommendation not found" });
      }

      res.json(recommendation);
    } catch (error) {
      console.error("Error fetching recommendation:", error);
      res.status(500).json({ message: "Failed to fetch recommendation" });
    }
  });

  // Get user's recommendations (authenticated route)
  app.get("/api/recommendations/user/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      
      // In production, verify that the requesting user matches the userId
      const requestingUserId = extractUserId(req);
      if (!requestingUserId || requestingUserId !== userId) {
        return res.status(403).json({ message: "Unauthorized" });
      }

      const recommendations = await storage.getUserRecommendations(userId);
      res.json(recommendations);
    } catch (error) {
      console.error("Error fetching user recommendations:", error);
      res.status(500).json({ message: "Failed to fetch recommendations" });
    }
  });

  // Get available AI providers
  app.get("/api/providers", async (req, res) => {
    try {
      const allProviders = [
        { name: "Gemini", available: !!process.env.GEMINI_API_KEY },
        { name: "Deepseek R1", available: !!process.env.OPENROUTER_API_KEY },
        { name: "OpenAI", available: !!process.env.OPENAI_API_KEY },
        { name: "Anthropic", available: !!process.env.ANTHROPIC_API_KEY },
        { name: "xAI Grok", available: !!process.env.XAI_API_KEY },
      ];

      const availableCount = allProviders.filter(p => p.available).length;

      res.json({ 
        providers: allProviders,
        count: availableCount
      });
    } catch (error) {
      console.error("Error getting providers:", error);
      res.status(500).json({ error: "Failed to get providers" });
    }
  });

  // Test Gemini API
  app.get('/api/test-gemini', async (req, res) => {
    try {
      const geminiProvider = new GeminiProvider();

      if (!geminiProvider.isAvailable()) {
        return res.status(400).json({ error: 'Gemini API key not configured' });
      }

      // Test with a simple request
      const testInput = "I need AI tools for content creation";
      const recommendations = await geminiProvider.generateRecommendations(testInput);

      res.json({ 
        success: true, 
        message: 'Gemini API is working correctly',
        toolCount: recommendations.length,
        sampleTool: recommendations[0]?.tool_name || 'No tools returned'
      });
    } catch (error) {
      console.error('Gemini API test failed:', error);
      res.status(500).json({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}