import { Router } from 'express';
import { generateLayout } from '../gemini.js';
import type { LayoutRequest } from '../types.js';

export const layoutRouter = Router();

layoutRouter.post('/', async (req, res) => {
  const body = req.body as Partial<LayoutRequest>;

  if (!body || typeof body.intent !== 'string' || !body.intent.trim()) {
    res.status(400).json({ error: 'El campo "intent" es requerido.' });
    return;
  }

  try {
    const result = await generateLayout({ intent: body.intent, item: body.item });
    res.json(result);
  } catch (err) {
    console.error('Error generando layout:', err);
    res.status(502).json({ error: 'No se pudo generar el layout con el LLM.' });
  }
});
