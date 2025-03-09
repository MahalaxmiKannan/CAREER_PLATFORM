import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { storage } from "./storage";
import express from "express";
import path from "path";

export async function registerRoutes(app: Express): Promise<Server> {
  setupAuth(app);

  // Serve static files from attached_assets directory when authenticated
  app.use("/assets", (req, res, next) => {
    // Allow access to login.html without authentication
    if (req.path === "/login.html") {
      return next();
    }
    if (!req.isAuthenticated()) {
      return res.redirect("/assets/login.html");
    }
    next();
  }, express.static(path.join(process.cwd(), "attached_assets")));

  // Redirect root to page1.html for authenticated users
  app.get("/", (req, res) => {
    if (!req.isAuthenticated()) {
      return res.redirect("/assets/login.html");
    }
    res.redirect("/assets/page1.html");
  });

  app.get("/api/mentors", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const mentors = await storage.getMentors();
    res.json(mentors);
  });

  app.get("/api/mentorships", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const mentorships = await storage.getMentorships(req.user!.id);
    res.json(mentorships);
  });

  app.post("/api/mentorships", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const mentorship = await storage.createMentorship({
      ...req.body,
      createdAt: new Date().toISOString(),
    });
    res.json(mentorship);
  });

  app.get("/api/resources", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const resources = await storage.getResources();
    res.json(resources);
  });

  const httpServer = createServer(app);
  return httpServer;
}
