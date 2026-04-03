import { IUserRepository } from '../repositories/UserRepository';
import { User } from '../entities/User';
import { GoogleGenAI, Type } from "@google/genai";

export class UserService {
  private ai: GoogleGenAI;

  constructor(private userRepository: IUserRepository) {
    this.ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });
  }

  async getUserProfile(id: number): Promise<User | null> {
    return await this.userRepository.findById(id);
  }

  async createOrUpdateUser(user: User): Promise<void> {
    const existingUser = user.id ? await this.userRepository.findById(user.id) : null;
    if (existingUser) {
      await this.userRepository.update(user);
    } else {
      await this.userRepository.save(user);
    }
  }

  async analyzeCV(userId: number, cvText: string): Promise<any> {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new Error("User not found");

    const response = await this.ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze the following CV text and provide a structured feedback in JSON format. 
      Include: 
      - score (0-100)
      - strengths (array of strings)
      - weaknesses (array of strings)
      - recommendations (array of strings)
      - suggestedRoles (array of strings)
      
      CV Text: ${cvText}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.NUMBER },
            strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
            weaknesses: { type: Type.ARRAY, items: { type: Type.STRING } },
            recommendations: { type: Type.ARRAY, items: { type: Type.STRING } },
            suggestedRoles: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["score", "strengths", "weaknesses", "recommendations", "suggestedRoles"]
        }
      }
    });

    const analysis = JSON.parse(response.text || "{}");
    // In a real app, we would save this to the AIAnalysis table
    return analysis;
  }
}
