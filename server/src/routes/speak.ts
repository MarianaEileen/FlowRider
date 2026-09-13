import { Router } from 'express';
import { synthesizeSpeech } from '../elevenlabs.js';

export const speakRouter = Router();

speakRouter.post('/', async (req, res) => {
  const { text } = req.body as { text?: string };

  if (typeof text !== 'string' || !text.trim()) {
    res.status(400).json({ error: 'El campo "text" es requerido.' });
    return;
  }

  try {
    const audio = await synthesizeSpeech(text);
    res.set('Content-Type', 'audio/mpeg');
    res.send(audio);
  } catch (err) {
    console.error('Error generando audio:', err);
    res.status(502).json({ error: 'No se pudo generar el audio.' });
  }
});
