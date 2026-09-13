import { Router } from 'express';
import multer from 'multer';
import { transcribeAudio } from '../elevenlabs.js';

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });

export const transcribeRouter = Router();

transcribeRouter.post('/', upload.single('audio'), async (req, res) => {
  if (!req.file) {
    res.status(400).json({ error: 'Falta el archivo de audio ("audio").' });
    return;
  }

  try {
    const text = await transcribeAudio(req.file.buffer, req.file.originalname || 'audio.webm', req.file.mimetype || 'audio/webm');
    res.json({ text });
  } catch (err) {
    console.error('Error transcribiendo audio:', err);
    res.status(502).json({ error: 'No se pudo transcribir el audio.' });
  }
});
