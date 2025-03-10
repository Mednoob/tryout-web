import { Hono } from "hono";
import { cors } from "hono/cors";

import mongoose from "mongoose";

import { apiRouter } from "./routers/index.ts";

console.log("Connecting to MongoDB");
await mongoose.connect(
    Deno.env.get("MONGO_URL")!,
    {
        dbName: Deno.env.get("DB_NAME"),
        serverApi: {
            version: "1",
            strict: true,
            deprecationErrors: true
        }
    }
);
console.log("Connected to MongoDB");

const app = new Hono();

app.use(cors());

app.route("/", apiRouter);

Deno.serve({ port: parseInt(Deno.env.get("PORT") ?? "8000") }, app.fetch);

console.log("Server started");
