import type { Express } from "express";
import { createServer, type Server } from "http";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes will be implemented here
  
  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "OK", message: "Server is running" });
  });

  const httpServer = createServer(app);
  return httpServer;
}