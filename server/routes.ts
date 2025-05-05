import type { Express } from "express";
import express from "express";
import { createServer, type Server } from "http";
import path from "path";
import fs from "fs";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // API Routes (if any are needed)
  app.get('/api/profile', (req, res) => {
    // Sample API endpoint
    res.json({
      name: "Moeed-ul-Hassan",
      title: "Web Developer & 3D Designer",
      experience: "3 years",
      skills: ["HTML/CSS", "JavaScript", "Three.js", "GSAP", "React", "UI/UX Design"]
    });
  });

  // Serve all static files directly from the public directory
  app.use(express.static(path.resolve(process.cwd(), 'public')));
  
  // Redirect root to the portfolio 
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(process.cwd(), 'public/index.html'));
  });
  
  // Any other route - fallback to index.html for client-side routing
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(process.cwd(), 'public/index.html'));
  });

  const httpServer = createServer(app);

  return httpServer;
}
