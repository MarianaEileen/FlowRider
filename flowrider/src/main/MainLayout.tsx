import React, { useRef, useState } from 'react';
import './MainLayout.css';
import MainCard, { type VariantType } from './MainCard';
import VariantA from './VariantA';
import VariantB from './VariantB';
import VariantC from './VariantC';
import type { ComponentSpec } from './layoutTypes';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8787';

const LAYOUT_TO_VARIANT: Record<string, VariantType> = {
  A: 'variantA',
  B: 'variantB',
  C: 'variantC',
};

export const MainLayout: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [activeVariant, setActiveVariant] = useState<VariantType>('variantA');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [components, setComponents] = useState<ComponentSpec[]>([]);
  const [replyText, setReplyText] = useState('');
  const [errorText, setErrorText] = useState('');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playReply = async (text: string) => {
    try {
      const res = await fetch(`${API_URL}/api/speak`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      if (!res.ok) throw new Error(`Speak request failed: ${res.status}`);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      if (audioRef.current) {
        audioRef.current.src = url;
        await audioRef.current.play();
      }
    } catch (err) {
      console.error('No se pudo reproducir la respuesta hablada:', err);
    }
  };

  const handleGenerate = async (overrideIntent?: string) => {
    const intent = overrideIntent ?? inputValue;
    if (!intent.trim() || isGenerating) return;
    setIsGenerating(true);
    setErrorText('');
    try {
      const res = await fetch(`${API_URL}/api/layout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ intent }),
      });
      if (!res.ok) throw new Error(`Layout request failed: ${res.status}`);
      const data: { layout: string; components: ComponentSpec[]; reply: string } = await res.json();
      const variant = LAYOUT_TO_VARIANT[data.layout];
      if (variant) {
        setActiveVariant(variant);
        setComponents(data.components ?? []);
      }
      setReplyText(data.reply ?? '');
      if (data.reply) void playReply(data.reply);
    } catch (err) {
      console.error('No se pudo generar el layout:', err);
      setReplyText('');
      setErrorText('No se pudo generar la respuesta (el servidor o Gemini pueden estar saturados). Intenta de nuevo.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAudioReady = async (blob: Blob) => {
    setIsTranscribing(true);
    setErrorText('');
    try {
      const form = new FormData();
      form.append('audio', blob, 'recording.webm');
      const res = await fetch(`${API_URL}/api/transcribe`, { method: 'POST', body: form });
      if (!res.ok) throw new Error(`Transcribe request failed: ${res.status}`);
      const data: { text: string } = await res.json();
      setInputValue(data.text);
      await handleGenerate(data.text);
    } catch (err) {
      console.error('No se pudo transcribir el audio:', err);
      setErrorText('No se pudo transcribir el audio. Intenta de nuevo.');
    } finally {
      setIsTranscribing(false);
    }
  };

  const renderActiveVariant = () => {
    switch (activeVariant) {
      case 'variantA':
        return <VariantA components={components} />;
      case 'variantB':
        return <VariantB components={components} />;
      case 'variantC':
        return <VariantC components={components} />;
      default:
        return null;
    }
  };

  return (
    <div className="dashboard-container">
      <section className="dashboard-sidebar">
        <MainCard
          inputValue={inputValue}
          onInputChange={setInputValue}
          activeVariant={activeVariant}
          onSelectVariant={setActiveVariant}
          onSubmit={() => handleGenerate()}
          onAudioReady={handleAudioReady}
          isSubmitting={isGenerating}
          isBusy={isTranscribing}
          replyText={replyText}
          errorText={errorText}
        />
      </section>

      <section className="dashboard-content">
        {renderActiveVariant()}
      </section>

      <audio ref={audioRef} hidden />
    </div>
  );
};

export default MainLayout;