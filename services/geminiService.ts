import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateRomanticText = async (context: string, type: 'short' | 'long' | 'poem'): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    
    let prompt = "";
    if (type === 'poem') {
      prompt = `Write a very short, romantic, 4-line poem about: ${context}. Keep it sweet, elegant, and suitable for a love confession. Do not include a title.`;
    } else if (type === 'short') {
      prompt = `Write a single, beautiful, poetic sentence describing this feeling or memory: "${context}".`;
    } else {
      prompt = `Write a heartfelt paragraph (approx 50 words) for a love letter based on this thought: "${context}". Use warm, emotive language.`;
    }

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });

    return response.text.trim();
  } catch (error) {
    console.error("Gemini generation error:", error);
    return "Love is not just looking at each other, it's looking in the same direction."; // Fallback quote
  }
};
