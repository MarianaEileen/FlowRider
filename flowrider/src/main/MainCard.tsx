import React, { useRef, useState } from 'react';
import './MainCard.css';

export type VariantType = 'variantA' | 'variantB' | 'variantC';

interface MainCardProps {
  inputValue: string;
  onInputChange: (val: string) => void;
  activeVariant: VariantType | null;
  onSelectVariant: (variant: VariantType) => void;
  onSubmit?: () => void;
  onAudioReady?: (blob: Blob) => void;
  disabled?: boolean;
  isGenerating?: boolean;
  isTranscribing?: boolean;
  replyText?: string;
  errorText?: string;
}

export const MainCard: React.FC<MainCardProps> = ({
  inputValue,
  onInputChange,
  activeVariant,
  onSelectVariant,
  onSubmit,
  onAudioReady,
  disabled = false,
  isGenerating,
  isTranscribing,
  replyText,
  errorText,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const busy = Boolean(isGenerating || isTranscribing);

  const handleMicClick = async () => {
    if (isRecording) {
      mediaRecorderRef.current?.stop();
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      chunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      recorder.onstop = () => {
        stream.getTracks().forEach((track) => track.stop());
        setIsRecording(false);
        const blob = new Blob(chunksRef.current, { type: recorder.mimeType || 'audio/webm' });
        onAudioReady?.(blob);
      };

      mediaRecorderRef.current = recorder;
      recorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error('No se pudo acceder al micrófono:', err);
    }
  };

  return (
    <div className="card">
      <div className="card-inner">
        <header className="card-header">
          <h2 className="card-title">How can I help you?</h2>
          <p className="card-subtitle">
            From question to answer in one seamless current.
          </p>
        </header>

        <div className="card-body">
          <label htmlFor="card-input" className="input-label">
            Shared Input Value
          </label>
          <div className="input-row">
            <input
              id="card-input"
              type="text"
              className="text-input"
              placeholder="Type something here..."
              value={inputValue}
              disabled={busy}
              onChange={(e) => onInputChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') onSubmit?.();
              }}
            />
            <button
              type="button"
              className={`btn-mic ${isRecording ? 'recording' : ''}`}
              onClick={handleMicClick}
              disabled={busy}
              aria-label={isRecording ? 'Detener grabación' : 'Grabar con micrófono'}
              title={isRecording ? 'Detener grabación' : 'Grabar con micrófono'}
            >
              {isRecording ? '⏹' : '🎤'}
            </button>
          </div>

          {isTranscribing && <p className="assistant-status">Transcribiendo audio…</p>}
          {isGenerating && !isTranscribing && <p className="assistant-status">Generando respuesta…</p>}
          {!busy && errorText && <p className="assistant-error">{errorText}</p>}
          {!busy && !errorText && replyText && <p className="assistant-reply">{replyText}</p>}
        </div>

        <div className="card-actions">
          <button
            type="button"
            disabled={disabled}
            className={`btn ${activeVariant === 'variantA' ? 'selected' : ''}`}
            onClick={() => onSelectVariant('variantA')}
          >
            Summary View
          </button>
          <button
            type="button"
            disabled={disabled}
            className={`btn ${activeVariant === 'variantB' ? 'selected' : ''}`}
            onClick={() => onSelectVariant('variantB')}
          >
            Analytics View
          </button>
          <button
            type="button"
            disabled={disabled}
            className={`btn ${activeVariant === 'variantC' ? 'selected' : ''}`}
            onClick={() => onSelectVariant('variantC')}
          >
            Settings View
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainCard;
