import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { getAIRecommendations } from "./services/gemini";
import { insertRecommendationSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get AI tool recommendations
  app.post("/api/recommendations", async (req, res) => {
    try {
      const { userInput } = insertRecommendationSchema.parse(req.body);
      
      if (!userInput.trim()) {
        return res.status(400).json({ message: "Business description is required" });
      }

      // Get AI recommendations using Gemini
      const tools = await getAIRecommendations(userInput);
      
      // Store the recommendation
      const recommendation = await storage.createRecommendation({
        userInput,
        tools,
      });

      res.json({
        id: recommendation.id,
        tools: recommendation.tools,
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

  const httpServer = createServer(app);
  return httpServer;
}
