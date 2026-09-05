import React from 'react';
import './ModelSelector.css';

function ModelSelector({ models, selectedModel, onModelChange }) {
  return (
    <div className="model-selector">
      <h2>Select Model</h2>
      <div className="models-grid">
        {models.map((model) => (
          <div
            key={model.id}
            className={`model-card ${selectedModel === model.id ? 'selected' : ''}`}
            onClick={() => onModelChange(model.id)}
          >
            <div className="model-icon">🤖</div>
            <h3>{model.name}</h3>
            <p>{model.description}</p>
            <span className="model-id">ID: {model.id}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ModelSelector;
