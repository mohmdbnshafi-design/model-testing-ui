import React from 'react';
import './ComparisonView.css';

function ComparisonView({ models, selectedModels, onModelsChange, query, onQueryChange, onSubmit, loading }) {
  const toggleModel = (modelId) => {
    if (selectedModels.includes(modelId)) {
      onModelsChange(selectedModels.filter(m => m !== modelId));
    } else {
      onModelsChange([...selectedModels, modelId]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && !loading) {
      onSubmit();
    }
  };

  return (
    <div className="comparison-view">
      <div className="comparison-models">
        <h2>Select Models to Compare</h2>
        <div className="model-toggles">
          {models.map((model) => (
            <label key={model.id} className="model-toggle">
              <input
                type="checkbox"
                checked={selectedModels.includes(model.id)}
                onChange={() => toggleModel(model.id)}
              />
              <span className="toggle-label">{model.name}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="comparison-query">
        <h2>Query for Comparison</h2>
        <p className="query-subtitle">Ask the same question to all selected models</p>
        <textarea
          className="query-textarea"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter your query here..."
          rows="6"
        />
        <button
          className="submit-btn"
          onClick={onSubmit}
          disabled={!query.trim() || selectedModels.length === 0 || loading}
        >
          {loading ? '⏳ Comparing...' : '🔄 Compare Models'}
        </button>
      </div>
    </div>
  );
}

export default ComparisonView;
