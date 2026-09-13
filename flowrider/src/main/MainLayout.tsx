import React, { useState } from 'react';
import './MainLayout.css';
import MainCard, { type VariantType } from './MainCard';
import VariantDefault from './VariantDefault';
import VariantA from './VariantA';
import VariantB from './VariantB';
import VariantC from './VariantC';

export const MainLayout: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [activeVariant, setActiveVariant] = useState<VariantType | null>(null);

  const renderActiveVariant = () => {
    switch (activeVariant) {
      case 'variantA':
        return <VariantA data={inputValue} />;
      case 'variantB':
        return <VariantB data={inputValue} />;
      case 'variantC':
        return <VariantC data={inputValue} />;
      default:
        return <VariantDefault />;
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
        />
      </section>

      <section className="dashboard-content">
        {renderActiveVariant()}
      </section>
    </div>
  );
};

export default MainLayout;