import { GoogleGenAI } from "@google/genai";
import { WorkoutPlan, NutritionLog } from "../types";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";

export class AIService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
  }

  async generateWorkout(goal: string, level: string): Promise<string> {
    const response = await this.ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Create a detailed workout plan for a ${level} athlete with the goal: "${goal}". 
      Return it as a structured description with exercises, sets, and reps.`,
    });
    return response.text;
  }

  async analyzeNutrition(mealDescription: string): Promise<Partial<NutritionLog['details']>> {
    const response = await this.ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze this meal: "${mealDescription}". 
      Estimate calories, protein, carbs, and fats. 
      Return ONLY as JSON with keys: calories, protein, carbs, fats.`,
      config: {
        responseMimeType: "application/json",
      }
    });

    try {
      return JSON.parse(response.text);
    } catch (e) {
      return { calories: 0, protein: 0, carbs: 0, fats: 0 };
    }
  }

  async chatWithCoach(message: string, history: { role: 'user' | 'model', parts: { text: string }[] }[]) {
     const response = await this.ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [...history, { role: 'user', parts: [{ text: message }] }],
      config: {
        systemInstruction: "You are ForgeAI, an elite fitness coach. You are encouraging, scientific, and direct. Focus on helping the user reach their peak potential."
      }
    });
    return response.text;
  }
}

export const aiService = new AIService();
