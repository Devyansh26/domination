import { GoogleGenerativeAI } from "@google/generative-ai";
import * as dotenv from "dotenv";
import fs from "fs";

function getApiKey() {
  const envFile = fs.readFileSync(".env.local", "utf-8");
  for (const line of envFile.split("\n")) {
    if (line.startsWith("GEMINI_API_KEY=")) {
      return line.split("=")[1].replace(/"/g, "").trim();
    }
  }
  return "";
}

async function listModels() {
  const apiKey = getApiKey();
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
  const data = await response.json();
  console.log("AVAILABLE MODELS:");
  data.models.forEach((m: any) => console.log(m.name, m.supportedGenerationMethods));
}

listModels();
