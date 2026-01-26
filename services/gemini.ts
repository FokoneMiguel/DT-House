
import { GoogleGenAI, Modality, LiveServerMessage } from "@google/genai";

/**
 * Initialise une nouvelle instance du SDK de manière sécurisée.
 */
const getAI = () => {
  // Accès sécurisé à la clé API (soit via l'injection plateforme, soit via le polyfill window)
  const env = (typeof process !== 'undefined' ? process.env : (window as any).process?.env) || {};
  const apiKey = env.API_KEY || '';
  
  if (!apiKey) {
    console.warn("Clé API Gemini manquante. Certaines fonctionnalités IA seront limitées.");
  }
  
  return new GoogleGenAI({ apiKey });
};

export function decodeBase64(base64: string) {
  try {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  } catch (e) {
    console.error("Erreur de décodage audio base64", e);
    return new Uint8Array(0);
  }
}

export function encodeBase64(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

export async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

export function connectConcierge(callbacks: {
  onopen: () => void;
  onmessage: (message: LiveServerMessage) => void;
  onerror: (e: any) => void;
  onclose: (e: any) => void;
}) {
  const ai = getAI();
  return ai.live.connect({
    model: 'gemini-2.5-flash-native-audio-preview-12-2025',
    callbacks,
    config: {
      responseModalities: [Modality.AUDIO],
      speechConfig: {
        voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } },
      },
      systemInstruction: 'Vous êtes un concierge immobilier expert pour ImmoDirect. Aidez les utilisateurs à trouver le logement de leurs rêves en posant des questions sur leur budget, localisation et préférences. Soyez chaleureux et professionnel.',
    },
  });
}

export async function getCityInsights(city: string, country: string) {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Donne moi des informations sur le marché de la location immobilière à ${city}, ${country}. Inclus le prix moyen, les meilleurs quartiers et des conseils locaux.`,
      config: { tools: [{ googleSearch: {} }] },
    });
    return {
      text: response.text || "Informations indisponibles.",
      sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
    };
  } catch (error) {
    return { text: "Service de recherche indisponible.", sources: [] };
  }
}

export async function getNearbyAmenities(city: string) {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Quels sont les commerces, parcs et transports importants à ${city} ?`,
      config: { tools: [{ googleMaps: {} }] },
    });
    return {
      text: response.text || "Données cartographiques indisponibles.",
      sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
    };
  } catch (error) {
    return { text: "Services non trouvés.", sources: [] };
  }
}

export async function generateDreamHome(prompt: string, aspectRatio: string = "16:9", imageSize: string = "1K") {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: { parts: [{ text: prompt }] },
      config: { 
        imageConfig: { 
          aspectRatio: aspectRatio as any, 
          imageSize: imageSize as any 
        } 
      }
    });
    
    if (response.candidates && response.candidates.length > 0) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
    }
    return null;
  } catch (err) {
    console.error("Erreur de génération d'image", err);
    throw err;
  }
}

export async function editPropertyImage(base64Image: string, editPrompt: string) {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          { inlineData: { data: base64Image.split(',')[1], mimeType: 'image/png' } },
          { text: editPrompt }
        ]
      }
    });
    
    if (response.candidates && response.candidates.length > 0) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
    }
    return null;
  } catch (err) { return null; }
}

export async function analyzePropertyImage(base64Image: string) {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: {
        parts: [
          { inlineData: { data: base64Image.split(',')[1], mimeType: 'image/png' } },
          { text: "Décris brièvement ce logement pour une annonce immobilière." }
        ]
      }
    });
    return response.text || "Analyse indisponible.";
  } catch (err) { return "Erreur d'analyse."; }
}
