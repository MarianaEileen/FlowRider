import React from 'react';

interface VariantProps {
  data: string;
}

export const VariantA: React.FC<VariantProps> = ({ data }) => {
  return (
    <div className="display-box variant-box">
      <span className="badge">Variant 1: Summary</span>
      <h3>Overview Dashboard</h3>
      <p className="placeholder-text">
        {data ? `Data Stream: "${data}"` : 'No input received yet.'}
      </p>
      <div style={{ marginTop: '1rem', color: '#64748b', fontSize: '0.875rem' }}>
        <p>• Status: Active</p>
        <p>• Character Count: {data.length}</p>
      </div>
    </div>
  );
};

export default VariantA;