import React, { useState, useEffect, useRef } from 'react';
import './MainLayout.css';
import MainCard, { type VariantType } from './MainCard';
import VariantDefault from './VariantDefault';
import VariantA from './VariantA';
import VariantB from './VariantB';
import VariantC from './VariantC';

type DisplayVariant = VariantType | 'default';

export const MainLayout: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [activeVariant, setActiveVariant] = useState<VariantType | null>(null);
  const [renderedVariant, setRenderedVariant] = useState<DisplayVariant>('default');
  const [stageClass, setStageClass] = useState<string>('');
  const [isBusy, setIsBusy] = useState<boolean>(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleSelectVariant = (newVariant: VariantType) => {
    if (newVariant === activeVariant || isBusy) return;

    setIsBusy(true);
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
            setIsBusy(false);
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

  const renderActiveVariant = () => {
    switch (renderedVariant) {
      case 'variantA':
        return <VariantA data={inputValue} stageClass={stageClass} />;
      case 'variantB':
        return <VariantB data={inputValue} stageClass={stageClass} />;
      case 'variantC':
        return <VariantC data={inputValue} stageClass={stageClass} />;
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
          onSelectVariant={handleSelectVariant}
          disabled={isBusy}
        />
      </section>

      <section className="dashboard-content">
        {renderActiveVariant()}
      </section>
    </div>
  );
};

export default MainLayout;