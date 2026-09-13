import React from 'react';

interface VariantProps {
  data: string;
}

export const VariantC: React.FC<VariantProps> = ({ data }) => {
  return (
    <div className="display-box variant-box">
      <span className="badge" style={{ backgroundColor: '#fee2e2', color: '#991b1b' }}>
        Variant 3: Settings
      </span>
      <h3>Configuration Options</h3>
      <p className="placeholder-text">
        {data ? `Draft Key: "${data}"` : 'Configure your settings parameters here.'}
      </p>
      <div style={{ marginTop: '1rem', color: '#64748b', fontSize: '0.875rem' }}>
        <p>• Environment: Production</p>
        <p>• Read-only state: Disabled</p>
      </div>
    </div>
  );
};

export default VariantC;