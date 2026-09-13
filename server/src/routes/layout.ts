import { Router } from 'express';
import { generateLayout } from '../gemini.js';
import { MOCK_RESPONSES, selectMockLayout } from '../mocks.js';
import type { LayoutRequest } from '../types.js';

export const layoutRouter = Router();

const useMock = process.env.MOCK_LLM === 'true';

layoutRouter.post('/', async (req, res) => {
  const body = req.body as Partial<LayoutRequest>;

  if (!body || typeof body.intent !== 'string' || !body.intent.trim()) {
    res.status(400).json({ error: 'El campo "intent" es requerido.' });
    return;
  }

  if (useMock) {
    res.json(MOCK_RESPONSES[selectMockLayout(body.intent)]);
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
