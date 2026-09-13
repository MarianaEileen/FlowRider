import React, { useState } from 'react';
import './MainLayout.css';
import MainCard, { type VariantType } from './MainCard';
import VariantA from './VariantA';
import VariantB from './VariantB';
import VariantC from './VariantC';

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

  const handleGenerate = async () => {
    if (!inputValue.trim() || isGenerating) return;
    setIsGenerating(true);
    try {
      const res = await fetch(`${API_URL}/api/layout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ intent: inputValue }),
      });
      if (!res.ok) throw new Error(`Layout request failed: ${res.status}`);
      const data: { layout: string } = await res.json();
      const variant = LAYOUT_TO_VARIANT[data.layout];
      if (variant) setActiveVariant(variant);
    } catch (err) {
      console.error('No se pudo generar el layout:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const renderActiveVariant = () => {
    switch (activeVariant) {
      case 'variantA':
        return <VariantA data={inputValue} />;
      case 'variantB':
        return <VariantB data={inputValue} />;
      case 'variantC':
        return <VariantC data={inputValue} />;
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
          onSubmit={handleGenerate}
          isSubmitting={isGenerating}
        />
      </section>

      <section className="dashboard-content">
        {renderActiveVariant()}
      </section>
    </div>
  );
};

export default MainLayout;