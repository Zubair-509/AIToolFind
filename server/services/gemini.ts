import { GoogleGenAI } from "@google/genai";
import { recommendationsResponseSchema, type AITool } from "@shared/schema";

const ai = new GoogleGenAI({ 
  apiKey: process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || "" 
});

export async function getAIRecommendations(userInput: string): Promise<AITool[]> {
  const maxRetries = 3;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const systemPrompt = `You are an AI assistant that recommends AI tools to users based on their business needs.

CRITICAL REQUIREMENTS:
- You MUST return exactly 7 tools
- First 4 tools MUST have pricing "Free" or "Freemium"
- Last 3 tools MUST have pricing "Paid"
- All tools must be real, trusted, and current as of 2025

User's business need: ${userInput}

Return exactly 7 tools in this JSON format:
[
  {"tool_name": "Free Tool 1", "purpose": "...", "pros": ["..."], "cons": ["..."], "pricing": "Free", "why_fit": "..."},
  {"tool_name": "Free Tool 2", "purpose": "...", "pros": ["..."], "cons": ["..."], "pricing": "Freemium", "why_fit": "..."},
  {"tool_name": "Free Tool 3", "purpose": "...", "pros": ["..."], "cons": ["..."], "pricing": "Free", "why_fit": "..."},
  {"tool_name": "Free Tool 4", "purpose": "...", "pros": ["..."], "cons": ["..."], "pricing": "Freemium", "why_fit": "..."},
  {"tool_name": "Paid Tool 1", "purpose": "...", "pros": ["..."], "cons": ["..."], "pricing": "Paid", "why_fit": "..."},
  {"tool_name": "Paid Tool 2", "purpose": "...", "pros": ["..."], "cons": ["..."], "pricing": "Paid", "why_fit": "..."},
  {"tool_name": "Paid Tool 3", "purpose": "...", "pros": ["..."], "cons": ["..."], "pricing": "Paid", "why_fit": "..."}
]`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        config: {
          systemInstruction: systemPrompt,
          responseMimeType: "application/json",
        },
        contents: `Analyze this business need and recommend exactly 7 AI tools (4 free/freemium + 3 paid): ${userInput}`,
      });

      const rawJson = response.text;
      
      if (!rawJson) {
        throw new Error("Empty response from Gemini AI");
      }

      const parsedTools = JSON.parse(rawJson);
      const validatedTools = recommendationsResponseSchema.parse(parsedTools);
      
      // Validate that we have exactly 7 tools with the correct pricing distribution
      if (validatedTools.length !== 7) {
        throw new Error(`Expected exactly 7 tools, but got ${validatedTools.length}`);
      }
      
      const freeTools = validatedTools.filter(tool => tool.pricing === "Free" || tool.pricing === "Freemium");
      const paidTools = validatedTools.filter(tool => tool.pricing === "Paid");
      
      if (freeTools.length !== 4) {
        throw new Error(`Expected 4 free/freemium tools, but got ${freeTools.length}`);
      }
      
      if (paidTools.length !== 3) {
        throw new Error(`Expected 3 paid tools, but got ${paidTools.length}`);
      }
      
      return validatedTools;
    } catch (error) {
      console.error(`Gemini AI Error (attempt ${attempt}/${maxRetries}):`, error);
      
      if (attempt === maxRetries) {
        throw new Error(`Failed to get AI recommendations after ${maxRetries} attempts: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
      
      // Wait a bit before retrying
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  
  throw new Error("Unexpected error in getAIRecommendations");
}
