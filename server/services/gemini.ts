import { GoogleGenAI } from "@google/genai";
import { recommendationsResponseSchema, type AITool } from "@shared/schema";

const ai = new GoogleGenAI({ 
  apiKey: process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || "" 
});

export async function getAIRecommendations(userInput: string): Promise<AITool[]> {
  try {
    const systemPrompt = `You are an AI assistant that recommends the best and latest AI tools to users based on their business goals or needs.
Your task is to:
1. Analyze the user's business description or goal.
2. Suggest 3 to 5 AI tools that can help them.
3. For each tool, provide:
   - Tool Name
   - Purpose
   - Pros
   - Cons
   - Pricing (Free / Freemium / Paid)
   - Why it's a good fit
Only suggest trusted and real tools that are up to date as of 2025. Tailor your answer to match the user's specific use case.

Respond with JSON in this exact format:
[
  {
    "tool_name": "Tool Name",
    "purpose": "Brief description of what the tool does",
    "pros": ["Advantage 1", "Advantage 2", "Advantage 3"],
    "cons": ["Limitation 1", "Limitation 2"],
    "pricing": "Free" or "Freemium" or "Paid",
    "why_fit": "Explanation of why this tool fits the user's needs"
  }
]`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: {
          type: "array",
          items: {
            type: "object",
            properties: {
              tool_name: { type: "string" },
              purpose: { type: "string" },
              pros: { 
                type: "array",
                items: { type: "string" }
              },
              cons: { 
                type: "array",
                items: { type: "string" }
              },
              pricing: { 
                type: "string",
                enum: ["Free", "Freemium", "Paid"]
              },
              why_fit: { type: "string" }
            },
            required: ["tool_name", "purpose", "pros", "cons", "pricing", "why_fit"]
          }
        }
      },
      contents: `User Input: ${userInput}`,
    });

    const rawJson = response.text;
    
    if (!rawJson) {
      throw new Error("Empty response from Gemini AI");
    }

    const parsedTools = JSON.parse(rawJson);
    const validatedTools = recommendationsResponseSchema.parse(parsedTools);
    
    return validatedTools;
  } catch (error) {
    console.error("Gemini AI Error:", error);
    throw new Error(`Failed to get AI recommendations: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
