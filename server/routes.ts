import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertWaitlistEntrySchema } from "@shared/schema";
import { z } from "zod";
import { addToEmailOctopus } from "./emailOctopus";


export async function registerRoutes(app: Express): Promise<Server> {
  // Waitlist endpoints
  app.post("/api/waitlist", async (req, res) => {
    try {
      const validatedData = insertWaitlistEntrySchema.parse(req.body);
      const entry = await storage.createWaitlistEntry(validatedData);
      
      // Add to Email Octopus mailing list
      await addToEmailOctopus(validatedData.email, validatedData.name);
      
      res.json({ success: true, entry: { id: entry.id, email: entry.email } });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Validation error", 
          errors: error.errors 
        });
      } else if (error instanceof Error && error.message === "Email already exists in waitlist") {
        res.status(409).json({ 
          success: false, 
          message: "You're already on our waitlist! We'll be in touch soon." 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Failed to join waitlist. Please try again." 
        });
      }
    }
  });

  app.get("/api/waitlist", async (req, res) => {
    try {
      const entries = await storage.getWaitlistEntries();
      res.json({ success: true, entries });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch waitlist entries" 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
