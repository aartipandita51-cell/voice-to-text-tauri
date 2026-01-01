import express from "express";
import fetch from "node-fetch";
import cors from "cors";


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.raw({ type: "audio/*", limit: "10mb" }));
const DEEPGRAM_API_KEY = "4df7ec24de04450db82b3434cb9bce1f161af57d";

app.post("/transcribe", async (req, res) => {
  try {
    const response = await fetch(
      "https://api.deepgram.com/v1/listen?punctuate=true&language=en",
      {
        method: "POST",
        headers: {
          Authorization: `Token ${DEEPGRAM_API_KEY}`,
          "Content-Type": "audio/webm",
        },
        body: req.body,
      }
    );

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Transcription failed");
  }
});

app.listen(3001, () => console.log("Proxy server running on http://localhost:3001"));
