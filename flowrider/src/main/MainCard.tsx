import React from 'react';
import './MainCard.css';

export type VariantType = 'variantA' | 'variantB' | 'variantC';

interface MainCardProps {
  inputValue: string;
  onInputChange: (val: string) => void;
  activeVariant: VariantType | null;
  onSelectVariant: (variant: VariantType) => void;
}

export const MainCard: React.FC<MainCardProps> = ({
  inputValue,
  onInputChange,
  activeVariant,
  onSelectVariant,
}) => {
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
          <input
            id="card-input"
            type="text"
            className="text-input"
            placeholder="Type something here..."
            value={inputValue}
            onChange={(e) => onInputChange(e.target.value)}
          />
        </div>

        <div className="card-actions">
          <button
            type="button"
            className={`btn ${activeVariant === 'variantA' ? 'selected' : ''}`}
            onClick={() => onSelectVariant('variantA')}
          >
            Summary View
          </button>
          <button
            type="button"
            className={`btn ${activeVariant === 'variantB' ? 'selected' : ''}`}
            onClick={() => onSelectVariant('variantB')}
          >
            Analytics View
          </button>
          <button
            type="button"
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