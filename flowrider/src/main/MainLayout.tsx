import React, { useEffect, useRef, useState } from 'react';
import './MainLayout.css';
import MainCard, { type VariantType } from './MainCard';
import VariantDefault from './VariantDefault';
import VariantA from './VariantA';
import VariantB from './VariantB';
import VariantC from './VariantC';
import type { ComponentSpec } from './layoutTypes';

type DisplayVariant = VariantType | 'default';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8787';

const LAYOUT_TO_VARIANT: Record<string, VariantType> = {
  A: 'variantA',
  B: 'variantB',
  C: 'variantC',
};

export const MainLayout: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [activeVariant, setActiveVariant] = useState<VariantType | null>(null);
  const [renderedVariant, setRenderedVariant] = useState<DisplayVariant>('default');
  const [stageClass, setStageClass] = useState<string>('');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const [isGenerating, setIsGenerating] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [components, setComponents] = useState<ComponentSpec[]>([]);
  const [replyText, setReplyText] = useState('');
  const [errorText, setErrorText] = useState('');
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const transitionToVariant = (newVariant: VariantType) => {
    if (newVariant === activeVariant || isTransitioning) return;

    setIsTransitioning(true);
    setActiveVariant(newVariant);

    // 1. Fade out current view (400ms)
    setStageClass('stage-exit');

    timerRef.current = setTimeout(() => {
      // 2. Mount new component completely invisible (prevents flashing)
      setRenderedVariant(newVariant);
      setStageClass('stage-prepare');

      // 3. Trigger simultaneous fade-in on next repaint cycle
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setStageClass('stage-enter');

          // 4. Reset to idle once fade-in finishes (450ms)
          timerRef.current = setTimeout(() => {
            setStageClass('');
            setIsTransitioning(false);
          }, 450);
        });
      });
    }, 400);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

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
        setComponents(data.components ?? []);
        transitionToVariant(variant);
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
    switch (renderedVariant) {
      case 'variantA':
        return <VariantA components={components} stageClass={stageClass} />;
      case 'variantB':
        return <VariantB components={components} stageClass={stageClass} />;
      case 'variantC':
        return <VariantC components={components} stageClass={stageClass} />;
      default:
        return <VariantDefault stageClass={stageClass} />;
    }
  };

  return (
    <div className="dashboard-container">
      <section className="dashboard-sidebar">
        <MainCard
          inputValue={inputValue}
          onInputChange={setInputValue}
          activeVariant={activeVariant}
          onSelectVariant={transitionToVariant}
          onSubmit={() => handleGenerate()}
          onAudioReady={handleAudioReady}
          disabled={isTransitioning}
          isGenerating={isGenerating}
          isTranscribing={isTranscribing}
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
