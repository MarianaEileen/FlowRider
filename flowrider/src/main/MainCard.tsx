import React from 'react';

export type VariantType = 'variantA' | 'variantB' | 'variantC';

interface MainCardProps {
  inputValue: string;
  onInputChange: (val: string) => void;
  activeVariant: VariantType;
  onSelectVariant: (variant: VariantType) => void;
  onSubmit?: () => void;
  isSubmitting?: boolean;
}

export const MainCard: React.FC<MainCardProps> = ({
  inputValue,
  onInputChange,
  activeVariant,
  onSelectVariant,
  onSubmit,
  isSubmitting,
}) => {
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
        <input
          id="card-input"
          type="text"
          className="text-input"
          placeholder="Type something here..."
          value={inputValue}
          disabled={isSubmitting}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') onSubmit?.();
          }}
        />
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