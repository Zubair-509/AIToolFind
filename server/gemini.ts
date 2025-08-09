import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export interface AITool {
  tool_name: string;
  purpose: string;
  pros: string[];
  cons: string[];
  pricing: string;
  why_fit: string;
  link?: string;
}

export async function getAIToolRecommendations(userInput: string): Promise<AITool[]> {
  try {
    const prompt = `You are an AI assistant and tool recommender that recommends the best and latest AI tools to users based on their business goals or needs.

Your task is to:
1. Analyze the user's business description or goal.
2. Suggest 4 paid and 5 unpaid AI tools that can help them.
3. Also add paid/unpaid AI Agents if they are best according to user need
3. For each tool, provide:
    - Tool Name
    - Purpose
    - Pros
    - Cons
    - Pricing (Free / Freemium / Paid)
    - Why it's a good fit
    - Their link so user can access it

Only suggest trusted and real tools that are up to date as of 2025. Tailor your answer to match the user's specific use case.

Respond with JSON array format like this example:
[
  {
    "tool_name": "Canva",
    "purpose": "Graphic design for social media and branding",
    "pros": [
      "Easy-to-use drag-and-drop interface",
      "Huge library of templates",
      "Collaborative editing"
    ],
    "cons": [
      "Limited advanced design features",
      "Some premium assets require payment"
    ],
    "pricing": "Freemium",
    "why_fit": "Perfect for creating professional Instagram posts, logos, and stories without needing graphic design skills.",
    "link": "https://canva.com"
  }
]

User Input:
"${userInput}"`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      config: {
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
              why_fit: { type: "string" },
              link: { type: "string" }
            },
            required: ["tool_name", "purpose", "pros", "cons", "pricing", "why_fit"]
          }
        }
      },
      contents: prompt,
    });

    const rawJson = response.text;
    console.log(`Gemini AI Response: ${rawJson}`);

    if (rawJson) {
      const recommendations: AITool[] = JSON.parse(rawJson);
      return recommendations;
    } else {
      throw new Error("Empty response from Gemini AI");
    }
  } catch (error) {
    console.error("Gemini AI Error:", error);
    throw new Error(`Failed to get AI recommendations: ${error}`);
  }
}