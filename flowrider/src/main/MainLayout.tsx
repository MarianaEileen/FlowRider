import React, { useState } from 'react';
import './MainLayout.css';

export const MainLayout: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [activeAction, setActiveAction] = useState<string | null>(null);

  const handleActionClick = (actionName: string) => {
    setActiveAction(actionName);
  };

  const handleReset = () => {
    setInputValue('');
    setActiveAction(null);
  };

  return (
    <div className="dashboard-container">
      {/* Left section: 1/3 width */}
      <section className="dashboard-sidebar">
        <div className="card">
          <header className="card-header">
            <h2 className="card-title">Configuration Panel</h2>
            <p className="card-subtitle">
              Adjust your inputs and trigger actions below.
            </p>
          </header>

          <div className="card-body">
            <label htmlFor="card-input" className="input-label">
              Primary Input
            </label>
            <input
              id="card-input"
              type="text"
              className="text-input"
              placeholder="Type something here..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>

          <div className="card-actions">
            <button
              type="button"
              className={`btn btn-primary ${activeAction === 'Apply' ? 'selected' : ''}`}
              onClick={() => handleActionClick('Apply')}
            >
              Apply
            </button>
            <button
              type="button"
              className={`btn btn-secondary ${activeAction === 'Preview' ? 'selected' : ''}`}
              onClick={() => handleActionClick('Preview')}
            >
              Preview
            </button>
            <button
              type="button"
              className="btn btn-outline"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
        </div>
      </section>

      {/* Right section: 2/3 width */}
      <section className="dashboard-content">
        <div className="display-box">
          <span className="badge">Dynamic Preview</span>
          <h3>Output Viewport</h3>
          <p className="placeholder-text">
            {inputValue
              ? `Current Input: "${inputValue}"`
              : 'Waiting for input from the main card...'}
          </p>
          {activeAction && (
            <p className="status-text">
              Active Action: <strong>{activeAction}</strong>
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

export default MainLayout;