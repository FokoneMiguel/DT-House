
import { GoogleGenAI, Modality, LiveServerMessage } from "@google/genai";

const getAI = () => {
  const env = (typeof process !== 'undefined' ? process.env : (window as any).process?.env) || {};
  const apiKey = env.API_KEY || '';
  return new GoogleGenAI({ apiKey });
};

export async function verifyCNI(base64Image: string) {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [
          { inlineData: { data: base64Image.split(',')[1], mimeType: 'image/png' } },
          { text: "Ceci est une Carte Nationale d'Identité du Cameroun. Extrais le nom complet et confirme si le document semble valide pour une vérification d'identité. Réponds en format JSON simple: {name: string, isValid: boolean, reason: string}" }
        ]
      }
    });
    return response.text;
  } catch (err) {
    return null;
  }
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

// Fix: Added generateDreamHome for high-quality image generation
export async function generateDreamHome(prompt: string, aspectRatio: string = '1:1', imageSize: string = '1K') {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-image-preview',
    contents: {
      parts: [{ text: prompt }]
    },
    config: {
      imageConfig: {
        aspectRatio: aspectRatio as any,
        imageSize: imageSize as any
      }
    }
  });
  
  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  throw new Error("No image generated");
}

// Fix: Added editPropertyImage for image-to-image editing
export async function editPropertyImage(base64Image: string, prompt: string) {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        { inlineData: { data: base64Image.includes(',') ? base64Image.split(',')[1] : base64Image, mimeType: 'image/png' } },
        { text: prompt }
      ]
    }
  });
  
  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  throw new Error("No image generated");
}

// Fix: Added connectConcierge for real-time voice sessions using the Live API
export function connectConcierge(callbacks: {
  onopen: () => void;
  onmessage: (message: LiveServerMessage) => void;
  onerror: (e: any) => void;
  onclose: () => void;
}) {
  const ai = getAI();
  return ai.live.connect({
    model: 'gemini-2.5-flash-native-audio-preview-12-2025',
    callbacks: callbacks,
    config: {
      responseModalities: [Modality.AUDIO],
      speechConfig: {
        voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } }
      },
      systemInstruction: "Tu es un concierge immobilier expert du marché camerounais. Aide les utilisateurs à trouver des logements, comprendre les quartiers de Douala et Yaoundé, et gère les questions sur les prix et les procédures."
    }
  });
}

export function encodeBase64(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

// Fix: Added missing decodeBase64 utility
export function decodeBase64(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

// Fix: Added missing decodeAudioData for raw PCM streaming audio
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
