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

  // Serve static files from the public directory
  app.use('/static', express.static(path.resolve(process.cwd(), 'public')));
  
  // Redirect root to the portfolio page
  app.get('/', (req, res) => {
    res.redirect('/portfolio');
  });
  
  // Serve the portfolio site
  app.get('/portfolio', (req, res) => {
    res.sendFile(path.resolve(process.cwd(), 'public/index.html'));
  });
  
  // Serve other static assets requested through the portfolio path
  app.get('/portfolio/*', (req, res) => {
    const requestedPath = req.path.replace('/portfolio/', '');
    const filePath = path.resolve(process.cwd(), 'public', requestedPath);
    
    try {
      if (fs.existsSync(filePath) && !fs.statSync(filePath).isDirectory()) {
        return res.sendFile(filePath);
      } else {
        return res.status(404).send('File not found');
      }
    } catch (err) {
      return res.status(500).send('Server error');
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
