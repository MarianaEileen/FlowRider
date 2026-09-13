import React from 'react';
import './Variant.css';

interface VariantDefaultProps {
  stageClass?: string;
}

export const VariantDefault: React.FC<VariantDefaultProps> = ({ stageClass = '' }) => {
  return (
    <div className={`variant-panel variant-panel-default ${stageClass}`}>
      <h2 className="default-headline">Instant answers, zero friction.</h2>
    </div>
  );
};

export default VariantDefault;