import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertWaitlistEntrySchema } from "@shared/schema";
import { z } from "zod";

// Email Octopus API integration
async function addToEmailOctopus(email: string, firstName: string = '') {
  const apiKey = process.env.EMAIL_OCTOPUS_API_KEY;
  const listId = process.env.EMAIL_OCTOPUS_LIST_ID; // You'll need to add this secret too
  
  if (!apiKey || !listId) {
    console.log('Email Octopus not configured, skipping...');
    return;
  }

  try {
    const response = await fetch(`https://emailoctopus.com/api/1.6/lists/${listId}/contacts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_key: apiKey,
        email_address: email,
        fields: {
          FirstName: firstName
        },
        status: 'SUBSCRIBED'
      })
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Email Octopus error:', error);
    } else {
      console.log('Successfully added to Email Octopus:', email);
    }
  } catch (error) {
    console.error('Email Octopus integration error:', error);
  }
}

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
