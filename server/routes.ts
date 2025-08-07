import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { AIService } from "./services/ai-providers";
import { insertRecommendationSchema } from "@shared/schema";
import { z } from "zod";
import { nanoid } from "nanoid";

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

      // Get AI recommendations using available providers
      const { tools, usedProvider } = await aiService.generateRecommendations(userInput);
      
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
  
  // Get available AI providers
  app.get("/api/providers", async (req, res) => {
    try {
      const availableProviders = aiService.getAvailableProviders();
      res.json({ 
        providers: availableProviders.map(p => ({ name: p.name, available: p.isAvailable() })),
        count: availableProviders.length
      });
    } catch (error) {
      console.error("Error getting providers:", error);
      res.status(500).json({ error: "Failed to get providers" });
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

  const httpServer = createServer(app);
  return httpServer;
}
