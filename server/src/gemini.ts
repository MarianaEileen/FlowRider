import { GoogleGenAI } from '@google/genai';
import { buildSystemPrompt } from './templates.js';
import type { LayoutRequest, LayoutResponse } from './types.js';

const model = process.env.GEMINI_MODEL ?? 'gemini-3.6-flash';
let ai: GoogleGenAI | undefined;

function getClient(): GoogleGenAI {
  if (ai) return ai;
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('Falta GEMINI_API_KEY en el entorno (revisa server/.env).');
  }
  ai = new GoogleGenAI({ apiKey });
  return ai;
}

export async function generateLayout({ intent, item }: LayoutRequest): Promise<LayoutResponse> {
  const contents = [
    `Intención del usuario: ${intent}`,
    item ? `Datos del elemento detallado (JSON): ${JSON.stringify(item)}` : null,
  ]
    .filter(Boolean)
    .join('\n\n');

  const response = await getClient().models.generateContent({
    model,
    contents,
    config: {
      systemInstruction: buildSystemPrompt(),
      responseMimeType: 'application/json',
    },
  });

  const text = response.text;
  if (!text) {
    throw new Error('Respuesta vacía del modelo.');
  }

  const parsed = JSON.parse(text) as Partial<LayoutResponse>;
  if (
    (parsed.layout !== 'A' && parsed.layout !== 'B' && parsed.layout !== 'C') ||
    !Array.isArray(parsed.components)
  ) {
    throw new Error(`Forma de respuesta inesperada del modelo: ${text}`);
  }

  return parsed as LayoutResponse;
}
