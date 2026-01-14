import "dotenv/config"; // Ensure env vars are loaded first
import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import { db } from "./db";
import { users, progress } from "./schema";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  
  // Body parsing middleware
  app.use(express.json({ limit: "10mb" }));
  
  // CORS configuration
  app.use(cors({
    origin: process.env.ALLOWED_ORIGIN || 'http://localhost:5173',
    credentials: true
  }));
  
  const server = createServer(app);

  // --- API Routes ---
  app.post("/api/register", async (req, res) => {
    if (!db) return res.status(500).json({ error: "Database not connected" });
    const { email, password, name } = req.body;
    try {
      const id = nanoid();
      const normalizedEmail = email.trim().toLowerCase();
      await db.insert(users).values({ id, email: normalizedEmail, password, name });
      await db.insert(progress).values({ userId: id, completedTutorials: [] });
      res.json({ success: true, user: { id, email, name, role: "user" } });
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Registration failed" });
    }
  });

  app.post("/api/login", async (req, res) => {
    if (!db) return res.status(500).json({ error: "Database not connected" });
    const { email, password } = req.body;
    try {
      const [user] = await db.select().from(users).where(eq(users.email, email.trim().toLowerCase()));
      if (!user || user.password !== password) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      res.json({ success: true, user: { id: user.id, email: user.email, name: user.name, role: user.role, avatar: user.avatar } });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/progress/:userId", async (req, res) => {
    if (!db) return res.status(500).json({ error: "Database not connected" });
    try {
      const [userProgress] = await db.select().from(progress).where(eq(progress.userId, req.params.userId));
      res.json(userProgress || { completedTutorials: [] });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/progress/:userId", async (req, res) => {
    if (!db) return res.status(500).json({ error: "Database not connected" });
    const { completedTutorials, lastVisited } = req.body;
    try {
      await db.update(progress)
        .set({ completedTutorials, lastVisited })
        .where(eq(progress.userId, req.params.userId));
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // --- Static File Handling ---
  // On Render, files are usually in 'dist/public' relative to project root
  const staticPath = path.resolve(__dirname, "..", "public");
  
  app.use(express.static(staticPath));

  // Catch-all route to serve the SPA (Single Page Application)
  app.get("*", (req, res) => {
    // Only serve index.html if the request is not for an API route
    if (req.path.startsWith('/api')) {
        return res.status(404).json({ error: "API route not found" });
    }
    res.sendFile(path.join(staticPath, "index.html"));
  });

  // --- Port Binding for Render ---
  const port = parseInt(process.env.PORT || "3000");

  // MUST bind to "0.0.0.0" for Render to route traffic
  server.listen(port, "0.0.0.0", () => {
    console.log(`Server listening on port ${port}`);
  });

  // Graceful shutdown for production stability
  process.on("SIGTERM", () => {
    console.log("SIGTERM received. Closing server...");
    server.close(() => {
      process.exit(0);
    });
  });
}

startServer().catch((err) => {
  console.error("Critical: Failed to start server:", err.message);
});