
import { GoogleGenAI, Type, Modality } from "@google/genai";

export class GeminiService {
  // Recommendation: Create a new GoogleGenAI instance right before making an API call 
  // to ensure it uses the most up-to-date API key from the user selection context.

  async analyzeStrategy(marketContext: string) {
    // Fixed: Initializing instance inside the method to ensure fresh API key context
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-pro-preview",
        contents: `Analyze this market context for SMC (Smart Money Concepts) and ICT setups: ${marketContext}`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              setupName: { type: Type.STRING },
              bias: { type: Type.STRING },
              entryZone: { type: Type.STRING },
              targets: { type: Type.ARRAY, items: { type: Type.STRING } },
              riskNote: { type: Type.STRING },
              confidence: { type: Type.NUMBER }
            },
            required: ["setupName", "bias", "entryZone", "targets", "confidence"]
          }
        }
      });
      const text = response.text;
      return text ? JSON.parse(text.trim()) : null;
    } catch (error) {
      console.error("Gemini strategy analysis failed:", error);
      return null;
    }
  }

  async conductDeepResearch(topic: string) {
    // Fixed: Initializing instance inside the method to ensure fresh API key context
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-pro-preview",
        contents: `Act as a world-class institutional trader and ICT/SMC mentor. Conduct an EXHAUSTIVE deep research session on the following topic: ${topic}. 
        Provide a 50-minute equivalent of high-density technical knowledge. 
        Break it down into:
        1. Core Theory & Logic (The 'Why' behind the algorithm).
        2. Visual Signatures (What to look for on the 1m/5m/1h/Daily).
        3. Real Trade Proof Case Study (A step-by-step breakdown of a high-R trade).
        4. Psychological Warfare (How retail is trapped and how to stay on the side of the algorithm).
        5. Exact Execution Protocol.
        
        Format as highly technical, professional, and dense text.`,
        config: {
          thinkingConfig: { thinkingBudget: 32768 }
        }
      });
      return response.text;
    } catch (error) {
      console.error("Deep research failed:", error);
      return "Critical connection error during deep neural research. Please re-initiate link.";
    }
  }

  async generateTeachingVideo(prompt: string) {
    // Fixed: Initializing instance inside the method to ensure fresh API key context
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    let operation = await ai.models.generateVideos({
      model: 'veo-3.1-fast-generate-preview',
      prompt: `${prompt}. High-fidelity technical trading interface with institutional markings. Professional cinematic camera work. 1080p.`,
      config: {
        numberOfVideos: 1,
        resolution: '1080p',
        aspectRatio: '16:9'
      }
    });

    while (!operation.done) {
      await new Promise(resolve => setTimeout(resolve, 10000));
      operation = await ai.operations.getVideosOperation({operation: operation});
    }

    const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
    return `${downloadLink}&key=${process.env.API_KEY}`;
  }

  async generateNarration(text: string) {
    // Fixed: Initializing instance inside the method to ensure fresh API key context
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: `Professional institutional mentor voice, clear and authoritative: ${text.slice(0, 500)}` }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Zephyr' },
          },
        },
      },
    });
    return response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  }
}

export const geminiService = new GeminiService();
