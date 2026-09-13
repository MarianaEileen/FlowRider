import React, { useRef, useState } from 'react';

export type VariantType = 'variantA' | 'variantB' | 'variantC';

interface MainCardProps {
  inputValue: string;
  onInputChange: (val: string) => void;
  activeVariant: VariantType;
  onSelectVariant: (variant: VariantType) => void;
  onSubmit?: () => void;
  onAudioReady?: (blob: Blob) => void;
  isSubmitting?: boolean;
  isBusy?: boolean;
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
  isSubmitting,
  isBusy,
  replyText,
  errorText,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

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

  const disabled = isSubmitting || isBusy;

  return (
    <div className="card">
      <header className="card-header">
        <h2 className="card-title">Configuration Panel</h2>
        <p className="card-subtitle">
          Select a view mode and adjust your live input below.
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
            disabled={disabled}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') onSubmit?.();
            }}
          />
          <button
            type="button"
            className={`btn-mic ${isRecording ? 'recording' : ''}`}
            onClick={handleMicClick}
            disabled={isSubmitting}
            aria-label={isRecording ? 'Detener grabación' : 'Grabar con micrófono'}
            title={isRecording ? 'Detener grabación' : 'Grabar con micrófono'}
          >
            {isRecording ? '⏹' : '🎤'}
          </button>
        </div>

        {isBusy && <p className="assistant-status">Transcribiendo audio…</p>}
        {isSubmitting && !isBusy && <p className="assistant-status">Generando respuesta…</p>}
        {!isSubmitting && !isBusy && errorText && <p className="assistant-error">{errorText}</p>}
        {!isSubmitting && !isBusy && !errorText && replyText && <p className="assistant-reply">{replyText}</p>}
      </div>

      <div className="card-actions">
        <button
          type="button"
          className={`btn btn-primary ${activeVariant === 'variantA' ? 'selected' : ''}`}
          onClick={() => onSelectVariant('variantA')}
        >
          Summary View
        </button>
        <button
          type="button"
          className={`btn btn-secondary ${activeVariant === 'variantB' ? 'selected' : ''}`}
          onClick={() => onSelectVariant('variantB')}
        >
          Analytics View
        </button>
        <button
          type="button"
          className={`btn btn-outline ${activeVariant === 'variantC' ? 'selected' : ''}`}
          onClick={() => onSelectVariant('variantC')}
        >
          Settings View
        </button>
      </div>
    </div>
  );
};

export default MainCard;
