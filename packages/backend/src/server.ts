import "dotenv/config";
import cors from "cors";
import express from "express";
import { db } from "./db";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/save", async (req, res) => {
  try {
    const { name, score, settings } = req.body;

    const { data } = await db
      .from("results")
      .insert([
        {
          name,
          score,
          settings,
        },
      ])
      .select();

    res.status(200).json(data);
  } catch (_err) {
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/top-scores", async (_, res) => {
  try {
    const { data } = await db
      .from("results")
      .select()
      .order("score", { ascending: false })
      .limit(10);

    res.status(200).json(data);
  } catch (_err) {
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/results/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const { data } = await db.from("results").select().eq("id", userId);

    res.status(200).json(data);
  } catch (err) {
    console.error("Failed to get results", err);
    res.status(500).json({ error: "Server error" });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}`);
});
