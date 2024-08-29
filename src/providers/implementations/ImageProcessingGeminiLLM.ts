import "dotenv/config";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";

const apiKey = process.env.GEMINI_API_KEY
if (!apiKey) { throw Error("A variável de ambiente GEMINI_API_KEY é necessitaria.") }
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const fileManager = new GoogleAIFileManager(apiKey);
