import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { layoutRouter } from './routes/layout.js';
import { speakRouter } from './routes/speak.js';
import { transcribeRouter } from './routes/transcribe.js';

const app = express();
const port = Number(process.env.PORT ?? 8787);
const frontendOrigin = process.env.FRONTEND_ORIGIN ?? 'http://localhost:5173';

// Vite picks the next free port when 5173 is taken, so allow any localhost port in dev.
app.use(cors({ origin: [frontendOrigin, /^http:\/\/localhost:\d+$/] }));
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.use('/api/layout', layoutRouter);
app.use('/api/transcribe', transcribeRouter);
app.use('/api/speak', speakRouter);

app.listen(port, () => {
  console.log(`FlowRider backend escuchando en http://localhost:${port}`);
});
