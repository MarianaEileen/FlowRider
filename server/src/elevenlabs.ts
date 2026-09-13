const API_BASE = 'https://api.elevenlabs.io/v1';

function getApiKey(): string {
  const key = process.env.ELEVENLABS_API_KEY;
  if (!key) {
    throw new Error('Falta ELEVENLABS_API_KEY en el entorno (revisa server/.env).');
  }
  return key;
}

export async function transcribeAudio(audio: Buffer, filename: string, mimeType: string): Promise<string> {
  const form = new FormData();
  form.append('model_id', process.env.ELEVENLABS_STT_MODEL_ID ?? 'scribe_v1');
  form.append('file', new Blob([audio], { type: mimeType }), filename);

  const res = await fetch(`${API_BASE}/speech-to-text`, {
    method: 'POST',
    headers: { 'xi-api-key': getApiKey() },
    body: form,
  });

  if (!res.ok) {
    throw new Error(`ElevenLabs STT error ${res.status}: ${await res.text()}`);
  }

  const data = (await res.json()) as { text?: string };
  if (typeof data.text !== 'string') {
    throw new Error('Respuesta de transcripción sin texto.');
  }
  return data.text;
}

export async function synthesizeSpeech(text: string): Promise<Buffer> {
  const voiceId = process.env.ELEVENLABS_VOICE_ID ?? '21m00Tcm4TlvDq8ikWAM';
  const modelId = process.env.ELEVENLABS_MODEL_ID ?? 'eleven_multilingual_v2';

  const res = await fetch(`${API_BASE}/text-to-speech/${voiceId}`, {
    method: 'POST',
    headers: {
      'xi-api-key': getApiKey(),
      'Content-Type': 'application/json',
      Accept: 'audio/mpeg',
    },
    body: JSON.stringify({
      text,
      model_id: modelId,
      voice_settings: { stability: 0.5, similarity_boost: 0.75 },
    }),
  });

  if (!res.ok) {
    throw new Error(`ElevenLabs TTS error ${res.status}: ${await res.text()}`);
  }

  return Buffer.from(await res.arrayBuffer());
}
