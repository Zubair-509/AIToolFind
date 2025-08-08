import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { AIService } from "./services/ai-providers";
import { insertRecommendationSchema } from "@shared/schema";
import { z } from "zod";
import { nanoid } from "nanoid";
import { GeminiProvider } from "./services/ai-providers";



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

      // Get AI recommendations using available providers
      const { tools, usedProvider } = await aiService.generateRecommendations(userInput, preferredProvider);

      // Store the recommendation
      const recommendation = await storage.createRecommendation({
        userInput,
        tools,
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

  // Get all recommendations
  app.get("/api/recommendations", async (req, res) => {
    try {
      const recommendations = await storage.getAllRecommendations();
      res.json(recommendations);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      res.status(500).json({ message: "Failed to fetch recommendations" });
    }
  });

  // Get available AI providers
  app.get("/api/providers", async (req, res) => {
    try {
      const allProviders = [
        { name: "Gemini", available: !!(process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY) },
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