import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { layoutRouter } from './routes/layout.js';

const app = express();
const port = Number(process.env.PORT ?? 8787);
const frontendOrigin = process.env.FRONTEND_ORIGIN ?? 'http://localhost:5173';

app.use(cors({ origin: frontendOrigin }));
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.use('/api/layout', layoutRouter);

app.listen(port, () => {
  console.log(`FlowRider backend escuchando en http://localhost:${port}`);
});
