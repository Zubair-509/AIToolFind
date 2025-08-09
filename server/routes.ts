import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertRecommendationSchema } from "@shared/schema";
import { z } from "zod";
import { getAIToolRecommendations } from "./gemini";
import { nanoid } from "nanoid";



export async function registerRoutes(app: Express): Promise<Server> {

  // Get AI tool recommendations using Gemini AI
  app.post("/api/recommendations", async (req, res) => {
    try {
      const { userInput } = insertRecommendationSchema.parse(req.body);

      if (!userInput.trim()) {
        return res.status(400).json({ message: "Business description is required" });
      }

      console.log("Getting AI recommendations for:", userInput);

      // Get recommendations from Gemini AI
      const tools = await getAIToolRecommendations(userInput);
      
      // Store the recommendation
      const recommendation = {
        id: nanoid(),
        tools,
        created_at: new Date().toISOString(),
        user_input: userInput,
      };

      await storage.createRecommendation(recommendation);

      res.json(recommendation);
    } catch (error) {
      console.error("Error getting AI recommendations:", error);
      res.status(500).json({ 
        message: "Failed to get AI recommendations. Please try again.",
        error: error instanceof Error ? error.message : "Unknown error"
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
      const providers = [
        {
          name: "gemini",
          available: true,
          model: "Gemini 2.5 Flash"
        }
      ];

      res.json({ 
        providers,
        count: providers.length,
        message: "Gemini AI is ready for recommendations"
      });
    } catch (error) {
      console.error("Error getting providers:", error);
      res.status(500).json({ error: "Failed to get providers" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}