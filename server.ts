/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { ChatRequestSchema } from "./src/types.ts";
import { getProvider } from "./src/server/inference.ts";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/status", (req, res) => {
    const mode = process.env.BARBARYBOT_INFERENCE_MODE || "stub";
    res.json({ 
      mode,
      status: "online",
      cutoff: "April 18, 1906, 5:11 a.m."
    });
  });

  app.post("/api/chat", async (req, res) => {
    try {
      // Validate request body with Zod
      const body = req.body;
      const provider = getProvider();
      
      console.log(`[BarbaryBot] Using provider: ${provider.name}`);

      // Set up streaming response
      res.setHeader("Content-Type", "text/plain; charset=utf-8");
      res.setHeader("Transfer-Encoding", "chunked");

      const stream = await provider.generate(body);
      const reader = stream.getReader();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        res.write(value);
      }

      res.end();
    } catch (error) {
      console.error("Chat Error:", error);
      res.status(500).json({ error: "Failed to generate response" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production static serving
    const distPath = path.join(__dirname, "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`BarbaryBot Server running on http://localhost:${PORT}`);
    console.log(`Inference Mode: ${process.env.BARBARYBOT_INFERENCE_MODE || 'stub (default)'}`);
  });
}

startServer();
