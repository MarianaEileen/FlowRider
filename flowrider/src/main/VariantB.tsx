import React from 'react';

interface VariantProps {
  data: string;
}

export const VariantB: React.FC<VariantProps> = ({ data }) => {
  return (
    <div className="display-box variant-box">
      <span className="badge" style={{ backgroundColor: '#fef3c7', color: '#92400e' }}>
        Variant 2: Analytics
      </span>
      <h3>Metric Insights</h3>
      <p className="placeholder-text">
        {data ? `Payload to analyze: "${data}"` : 'Awaiting data for metrics calculation...'}
      </p>
      <div style={{ marginTop: '1rem', color: '#64748b', fontSize: '0.875rem' }}>
        <p>• Words: {data.trim() ? data.trim().split(/\s+/).length : 0}</p>
        <p>• Uppercase: {data.toUpperCase() || 'N/A'}</p>
      </div>
    </div>
  );
};

export default VariantB;