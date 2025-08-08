import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertRecommendationSchema } from "@shared/schema";
import { z } from "zod";



export async function registerRoutes(app: Express): Promise<Server> {

  // Get AI tool recommendations - temporarily disabled
  app.post("/api/recommendations", async (req, res) => {
    try {
      const { userInput } = insertRecommendationSchema.parse(req.body);

      if (!userInput.trim()) {
        return res.status(400).json({ message: "Business description is required" });
      }

      // AI services temporarily disabled - return placeholder message
      res.status(503).json({ 
        message: "AI recommendations service is currently being reconfigured. Please try again later." 
      });
    } catch (error) {
      console.error("Error processing request:", error);
      res.status(500).json({ 
        message: "Failed to process request. Please try again." 
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

  // AI providers temporarily disabled
  app.get("/api/providers", async (req, res) => {
    try {
      res.json({ 
        providers: [],
        count: 0,
        message: "AI providers are being reconfigured"
      });
    } catch (error) {
      console.error("Error getting providers:", error);
      res.status(500).json({ error: "Failed to get providers" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}