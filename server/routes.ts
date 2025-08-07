import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { getAIRecommendations } from "./services/gemini";
import { hashPassword, comparePassword, generateToken } from "./services/auth";
import { authenticateToken, optionalAuth } from "./middleware/auth";
import { insertUserSchema, insertRecommendationSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth routes
  app.post("/api/auth/signup", async (req, res) => {
    try {
      const { name, email, password } = insertUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: "User already exists with this email" });
      }

      // Hash password and create user
      const hashedPassword = await hashPassword(password);
      const user = await storage.createUser({
        name,
        email,
        password: hashedPassword,
      });

      // Generate token
      const token = generateToken(user);

      res.status(201).json({
        message: "User created successfully",
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      });
    } catch (error) {
      console.error("Signup error:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Validation error", 
          errors: error.errors 
        });
      }
      res.status(500).json({ message: "Failed to create account" });
    }
  });

  app.post("/api/auth/signin", async (req, res) => {
    try {
      const { email, password } = req.body;
      
      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
      }

      // Find user by email
      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // Verify password
      const isPasswordValid = await comparePassword(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // Generate token
      const token = generateToken(user);

      res.json({
        message: "Signed in successfully",
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      });
    } catch (error) {
      console.error("Signin error:", error);
      res.status(500).json({ message: "Failed to sign in" });
    }
  });

  app.get("/api/auth/me", authenticateToken, async (req, res) => {
    try {
      const user = await storage.getUserById(req.user!.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({
        id: user.id,
        name: user.name,
        email: user.email,
      });
    } catch (error) {
      console.error("Get user error:", error);
      res.status(500).json({ message: "Failed to get user information" });
    }
  });

  // Get AI tool recommendations
  app.post("/api/recommendations", optionalAuth, async (req, res) => {
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
        userId: req.user?.userId,
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
